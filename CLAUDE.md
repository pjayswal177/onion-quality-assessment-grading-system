# Claude Project Guide

## Project Intent

Build a hackathon-ready Onion Quality Assessment and Grading System. It should classify visible onion conditions, combine predictions with optional measured attributes, and return an explainable Grade A/B/C/Reject result through a web dashboard and API.

This repository may begin as an empty scaffold. Treat the structure in `README.md` as the intended architecture, not proof that every component or model already exists. Inspect the current files before editing, preserve working user changes, and implement a small vertical slice at a time.

## Product Boundaries

- Classes: `healthy`, `rotten`, `sprouted`, and `sunscald_mold`.
- Prototype grading rules, applied in order: Reject if rot/fungus is detected or defect area is greater than 25%; Grade A if diameter is at least 55 mm, weight at least 100 g, roundness at least 0.85, and defects at most 2%; Grade B if diameter is at least 40 mm, weight at least 50 g, roundness at least 0.70, and defects at most 8%; otherwise Grade C. Keep rules deterministic and configurable; validate them against the intended standard before operational use.
- Final grade: Grade A, B, C, or Reject, with machine-readable reasons and a confidence value.
- Optional inputs: measured weight and diameter, plus device/sample metadata.
- Missing measurements must remain unknown; do not fabricate sensor values.
- A standard RGB image does not reveal real-world millimetres or weight by itself. Diameter from pixels needs calibration/reference information; weight requires a scale or supplied measurement.
- Low-confidence or unsupported results should be marked `needs_review` rather than presented as certain.
- These SIH26031 rules are prototype thresholds, not proof of compliance with an agricultural standard.

## Preferred Implementation

- Python 3.11+; FastAPI for the API; Pydantic for validation.
- OpenCV plus YOLOv8 for defect detection, targeting Raspberry Pi deployment when compatible dependencies, labeled data, model weights, and hardware are available.
- SQLite for a local prototype; vanilla HTML/CSS/JavaScript for the dashboard.
- CSV export is required for the demo; PDF and mobile application are optional.
- Keep grading logic pure and independent from the API and ML runtime so it is easy to test.
- Follow the repository's existing tools and conventions if they differ from these defaults. Do not introduce an additional framework or dependency without a concrete need.

## Engineering Rules

1. First inspect the relevant implementation, tests, and project instructions. Do not assume the proposed tree is already present.
2. Make the smallest change that completes a user-visible vertical slice. Avoid generating empty placeholder files for every planned component.
3. Keep class names, preprocessing, and model output mapping in one explicit contract. A saved model must not silently use preprocessing that differs from training.
4. Validate image type/size and sensor units/ranges at the API boundary. Return actionable client errors without leaking stack traces or local paths.
5. Make grade decisions deterministic, configurable, and explainable. Include tests for thresholds, missing inputs, low confidence, and defect outcomes.
6. Split image data by source/onion/capture session before augmentation to reduce train/test leakage. Report per-class metrics and a confusion matrix, not accuracy alone.
7. Make demo and simulated data visibly distinct from real sensor readings and model-backed predictions.
8. Do not claim accuracy, readiness, food safety, or standards compliance without evidence.
9. Do not commit datasets, uploaded user images, credentials, generated caches, or large model artifacts by default. Document how to provide or reproduce them.
10. After editing, run the narrowest relevant test or validation command, then report what was changed and what remains unverified.

## Expected Result Contract

Keep the API response stable and explicit. A grading result should contain fields equivalent to:

```json
{
  "id": "generated-result-id",
  "condition": "healthy",
  "confidence": 0.94,
  "review_status": "automatic",
  "measurements": {
    "diameter_mm": 52.0,
    "weight_g": null,
    "size_band": "medium",
    "shape_consistency": null
  },
  "grade": "A",
  "reasons": ["No visible defect detected", "Diameter is within the medium band"],
  "inference_mode": "model"
}
```

This is an example contract, not a required implementation spelling. Document any chosen names and use them consistently across API, UI, persistence, and tests. `inference_mode` should distinguish at least `model` and `demo`; use `needs_review` when confidence or required evidence is inadequate.

## Hackathon Priorities

Prioritize a reliable end-to-end demo: simulate onions on a conveyor, show transparent grade rules and a live inspection log, support manual grade checks, and export a batch summary. Develop real OpenCV/YOLOv8 inference only as far as the available dataset supports. If data or hardware is missing, keep simulation clearly labeled and never present randomly generated values as AI predictions or live sensor readings.
