# Onion Quality Assessment and Grading System

A hackathon-ready prototype for assessing onion defects and assigning a transparent quality grade from an image and optional sensor measurements. The system combines computer vision with deterministic grading rules and presents results in a small web dashboard.

## Problem and Goal

Manual onion inspection is slow and varies between inspectors. This project aims to make first-pass sorting faster and more consistent by identifying visible defects, combining those findings with measurable attributes, and returning an explainable grade.

The prototype is a decision-support tool, not a certified food-safety or commercial grading system. Results depend on the quality and coverage of the training data and on consistent image capture.

## Hackathon Demo

The minimum end-to-end demonstration should let a user:

1. Upload one onion image in the dashboard.
2. Submit optional sensor values such as weight and measured diameter.
3. Receive a predicted condition, confidence, size/shape assessment, final grade, and human-readable reasons.
4. Review a batch summary and export a CSV report.

If a trained model or real sensor is unavailable, support a clearly labeled demo mode with sample data. Never present simulated results as live sensor readings or model predictions.

## Proposed Project Structure

```text
ai_model/
  dataset/
    healthy/
    rotten/
    sprouted/
    sunscald_mold/
    labels.csv
  notebooks/
    01_data_exploration.ipynb
    02_model_training.ipynb
  preprocessing.py
  train.py
  evaluate.py
  predict.py
  models/
    onion_defect_model.h5
grading_logic/
  size_grading.py
  weight_grading.py
  shape_grading.py
  quality_grading.py
  config.py
backend/
  app.py
  routes/
    grading.py
    reports.py
    devices.py
  database/
    schema.sql
    db.py
  utils/
    report_generator.py
dashboard/
  index.html
  css/style.css
  js/dashboard.js
  js/upload.js
  assets/
mobile_app/
  README.md
tests/
  test_size_grading.py
  test_quality_grading.py
  test_api.py
demo/
  sample_images/
  sample_sensor_data.csv
  demo_video.mp4
```

Generated model files, private data, and demo media may be omitted from source control when large; document how to obtain or regenerate them instead.

## Suggested Technical Choices

- **Backend:** Python 3.11+ and FastAPI, with Pydantic request/response models.
- **AI target:** OpenCV image handling with YOLOv8 defect detection, intended for Raspberry Pi deployment when compatible model weights, labeled data, and hardware are available.
- **Grading:** Small pure-Python functions with configurable thresholds, kept independent of the web framework and ML library.
- **Persistence:** SQLite for a local demo; keep database access behind a small repository/helper layer.
- **Dashboard:** HTML, CSS, and vanilla JavaScript, served by the backend or as a static page.
- **Reports:** CSV first; PDF is optional if time permits.

Use one dependency manager consistently and pin the dependencies needed to reproduce the demo.

## Prediction and Grading Flow

1. Validate the uploaded file and sensor values.
2. Decode the image, apply the exact preprocessing used during training, and predict one of `healthy`, `rotten`, `sprouted`, or `sunscald_mold`.
3. Return the predicted class and confidence. Treat low confidence as `needs_review`, not as a confident grade.
4. Determine size from a measured diameter or a calibrated image measurement. A pixel measurement alone cannot produce millimetres; image-based measurement needs a known reference object, fixed camera geometry, or depth/calibration data.
5. Assess weight only when a valid weight measurement is provided. Do not infer weight from an ordinary RGB image.
6. Estimate shape consistency only where the image and segmentation quality make that measurement meaningful; otherwise mark it unavailable.
7. Apply configurable, documented rules to produce Grade A, B, C, or Reject, together with reason codes.
8. Store the result and make it available to batch reports.

The current prototype uses the SIH26031 demo rules in this order: Reject when rot/fungus is detected or defect area is above 25%; Grade A when diameter is at least 55 mm, weight at least 100 g, roundness at least 0.85, and defects at most 2%; Grade B when diameter is at least 40 mm, weight at least 50 g, roundness at least 0.70, and defects at most 8%; otherwise Grade C. All thresholds are project-provided prototype rules and must be checked against the applicable grading standard before operational use.

## Dataset and Model Notes

`labels.csv` should map each image to a stable relative path and one class label. Keep a class mapping and image preprocessing contract with the trained model. Split data by onion, source, or capture session before augmentation so near-duplicate images do not leak across train and test sets.

Report per-class precision, recall, F1, a confusion matrix, and overall accuracy. Overall accuracy alone can hide a model that misses a rare defect. Include a confidence threshold and a manual-review outcome. Do not claim production accuracy from a small or unrepresentative hackathon dataset.

## API Sketch

- `POST /grade`: multipart image plus optional `weight_g`, `diameter_mm`, and device/sample metadata; returns prediction, confidence, measurements, grade, reasons, and an ID.
- `GET /reports`: returns saved results with simple filters such as date range and grade.
- `GET /reports/export.csv`: downloads a CSV batch report.
- `GET /devices`: returns device status. In demo mode, status must clearly say that readings are simulated or unavailable.
- `GET /health`: basic service health check.

Validate file type and size, reject malformed sensor values, use generated IDs, and avoid returning internal paths or stack traces. Keep CORS and upload limits explicit for the demo environment.

## Acceptance Criteria

- A valid image can pass through upload, inference (or clearly labeled demo fallback), grading, and dashboard display.
- Invalid files and out-of-range measurements produce useful client errors.
- Missing sensor values remain unavailable rather than being silently guessed.
- Grade decisions include reasons and are deterministic for the same inputs/configuration.
- Unit tests cover size boundaries, defect-to-grade decisions, low-confidence review, and missing measurements.
- API tests cover a successful grade request and representative validation failures.
- Evaluation output includes a confusion matrix and per-class metrics.
- The demo can be run from documented setup commands without relying on private machine paths.

## Suggested Build Order

1. Implement configuration and pure grading functions with boundary tests.
2. Define prediction/result schemas and a deterministic mock predictor for UI/API development.
3. Build the grading API, validation, persistence, and API tests.
4. Build the upload dashboard and batch CSV export.
5. Add dataset exploration, training, evaluation, and real inference.
6. Connect optional hardware, then rehearse the demo with both sensor-present and sensor-missing cases.

## Demo Safety and Privacy

Use only images and data that the team is allowed to use. Store uploads locally for the prototype, document retention behavior, and avoid collecting personal information. Clearly distinguish prediction from ground truth and show uncertainty to the operator.

## Running the Project

### Start in VS Code

Open **Run and Debug** and start **Launch Chrome against localhost**. The pre-launch task starts the local dashboard server on port `8081` and then opens Chrome.

### Start manually

From the project root in Windows PowerShell, run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .vscode/serve-dashboard.ps1
```

Then open `http://localhost:8081` in a browser. Stop the server with `Ctrl+C`. If port `8081` is already in use, stop the process using it before starting this demo.

### Current implementation status

The dashboard is a local interactive simulation. It animates randomly generated onions on a canvas conveyor, allows defect-rate and belt-speed controls, applies the grading rules above, updates grade counts, logs simulated measurements, and exports the session log as CSV. The manual grade checker uses entered measurements and the same rules. The current prototype does not run YOLOv8/OpenCV inference, connect to a Raspberry Pi, camera, scale, or physical conveyor, or save results in a database. Simulation output is not real inspection data.

## Publish the Dashboard with GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the static dashboard from the `dashboard/` folder whenever changes are pushed to the `main` branch.

1. Create a GitHub repository and push this project to its `main` branch, including the `.github/workflows/pages.yml` workflow.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open the **Actions** tab and wait for **Deploy Onion Dashboard to GitHub Pages** to finish successfully.
4. Open the Pages URL shown in the deployment summary. It will typically be `https://<owner>.github.io/<repository>/`.

If the repository's default branch is not `main`, change the workflow branch filter before pushing. The deployed site remains a simulated prototype; publishing it does not connect real hardware or enable YOLOv8 inference.
