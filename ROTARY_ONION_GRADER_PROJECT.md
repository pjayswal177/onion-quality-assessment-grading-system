# Design, Development and Performance Evaluation of a Rotary Onion Grader

## Project Proposal

**Project type:** Mechanical design, fabrication, and experimental evaluation  
**Application:** Size-based onion grading  
**Status:** Proposal and test plan; no machine dimensions or performance results have been measured yet

## Abstract

Manual onion grading can be slow, labor-intensive, and inconsistent between operators. This project proposes the design, fabrication, and evaluation of a small rotary grader that separates onions by size using perforated zones in a rotating cylindrical drum. The proposed machine consists of a controlled feed hopper, inclined feed conveyor, perforated drum, collection outlets, drive system, frame, and operator safety guards. Performance will be evaluated using grading accuracy, grade purity, grade recovery, mass-based grading efficiency, throughput, newly incurred damage, and specific energy consumption. Trials will compare selected drum speeds, slopes, and feed rates using onion size measured independently with a calibrated reference instrument. Size cutoffs, machine dimensions, and acceptance criteria will be selected from the target market's requirements and engineering calculations. No performance outcome is claimed until testing is completed.

## 1. Introduction

Onion size and uniformity affect handling, packing, storage, and market value. Manual sorting relies on repeated visual judgment and may produce inconsistent size groups, particularly when throughput is high. A mechanical rotary grader offers a way to move onions through size-selective openings and route them into separate collection bins.

This project focuses on the mechanical size-grading function. It is distinct from the browser-based vision simulation in this workspace: simulated dashboard readings are not physical grader measurements, and the proposed rotary grader does not require an AI model to perform its core size separation.

### Reference Study

Bisen, Bakane, and Sakkalkar describe a power-operated grader using an inclined feed conveyor and a perforated cylindrical drum, with separate outlets for small, medium, and large onions [1]. Their reported size classes were less than 40 mm, 40-60 mm inclusive, and greater than 60 mm. In their machine and trial conditions, the authors reported a maximum overall grading efficiency of 92.99% at 10 rpm drum speed and 4% slope, and a stated capacity of 20 tonnes per day. Their response-surface experiment varied drum speed and slope across 13 treatment combinations. These are published results for that specific machine, onion sample, and metric; they are literature benchmarks, not expected or measured performance for this project. The study's mass-based grading efficiency should not be confused with count-based accuracy, grade purity, or recovery. See the full citation under References.

## 2. Problem Statement

Small-scale onion handling operations may lack affordable equipment that grades onions consistently while maintaining acceptable throughput and minimizing mechanical damage. A rotary grader must be designed around the target onion population, available fabrication methods, required capacity, and local grading specifications. Its actual accuracy and capacity must be established experimentally rather than assumed from the design.

## 3. Aim and Objectives

### Aim

To design, fabricate, and evaluate a rotary onion grader for size-based separation.

### Objectives

1. Characterize the size distribution and handling requirements of the selected onion samples.
2. Develop engineering drawings and calculations for the feed system, perforated drum, drive, frame, and collection outlets.
3. Fabricate and assemble a guarded prototype using locally available materials and components.
4. Measure grading performance at selected drum speeds, slopes, and feed rates.
5. Identify operating conditions that balance grading quality, throughput, damage, and energy use.
6. Document limitations and recommendations for further development.

## 4. Scope and Design Basis

The prototype will mechanically separate onions by a reference size measure, normally maximum transverse diameter. It will not determine onion weight, internal quality, disease, or food safety. Optional image analysis may be investigated separately, but it must not be represented as part of the mechanical grader unless it is implemented and tested.

Before detailed design, record the following design inputs:

| Design input | Value to establish |
|---|---|
| Target onion varieties and source | To be measured/documented |
| Reference diameter method | Calibrated caliper or equivalent |
| Required size classes and cutoffs | Select from the applicable buyer/market specification |
| Target throughput | Set with intended users |
| Available power source | Record voltage, phase, and frequency |
| Available fabrication materials and tools | Record locally |
| Acceptable damage rate and grading error | Define before trials |

Do not use a proposed size band as a legal or universal standard unless the relevant market specification confirms it. Keep the class cutoffs configurable in the test plan.

## 5. Proposed Machine Design

### 5.1 Main Components

- **Inclined feed conveyor and hopper:** Delivers onions to the drum in a controlled flow and limits excessive drop height and crowding.
- **Perforated cylindrical drum:** Rotates on a supported shaft. Perforation zones are arranged along the drum so onions pass through the first size-compatible aperture zone; larger onions continue to later zones and the discharge end. Use replaceable or adjustable perforated liners if the prototype must support different cutoffs.
- **Collection outlets:** Separate onions passing through each perforation zone and collect the oversize fraction at the drum discharge. Keep outlet labels aligned with the configured size classes.
- **Optional skin-removal unit:** A blower and collection separator may be evaluated as a separate module. It should not be included unless the airflow and skin collection are controlled and tested.
- **Drive system:** A guarded motor and reduction/transmission system rotate the drum. Provide a means to set and independently measure drum speed and slope.
- **Frame and supports:** Hold the drum, shaft, bearings, conveyor, and outlets aligned and resist vibration under the intended load.
- **Guards and controls:** Cover belts, chains, gears, and nip points. Provide an accessible stop control and safe cleaning access.

### 5.2 Operating Principle

1. The operator loads a controlled quantity into the hopper.
2. The conveyor presents onions to the drum inlet at a measured feed rate.
3. Drum rotation lifts and tumbles the onions; drum slope and rotation move them gradually toward the discharge end.
4. Onions smaller than a perforation zone pass through it into that class outlet. Larger onions continue to the next zone, while the largest fraction exits at the drum end.
5. The operator weighs and measures the output from each bin, checks for damage, and records the run conditions.

The drum diameter, length, inclination, aperture shape and spacing, rotation direction, liner material, and feed arrangement must be confirmed by drawings and prototype testing. Dimensions should not be copied directly from another machine or guessed from this proposal; calculate them from the chosen onion population, clearances, structural loads, and fabrication tolerances.

### 5.3 Design Calculations to Complete

The detailed design report should show assumptions, equations, units, selected material properties, and safety factors for at least:

- Drum diameter, length, aperture progression, and open area relative to the chosen diameter cutoffs.
- Drum inclination and residence time for the target feed rate.
- Critical-speed and particle-motion limits using measured or justified friction assumptions.
- Shaft diameter under combined bending and torsion.
- Bearing selection and support reactions.
- Motor power, reduction ratio, and drum speed range.
- Frame strength and stability under loaded operation.
- Guard clearances and safe access for cleaning and maintenance.

A qualified supervisor should review the drive and guarding design before powered trials. Treat equations transcribed from scanned or copied literature as unverified until symbols, units, assumptions, and results have been checked against the original publication.

## 6. Materials and Equipment

Indicative items include perforated food-contact-appropriate drum material or liners, structural frame sections, a shaft and bearings, an inclined food-grade conveyor, a motor and speed controller or gearbox, guards, collection bins, a tachometer, an inclinometer, a calibrated caliper, a weighing scale, an electrical power meter, a stopwatch, and inspection/data-recording sheets. Final material selection must consider corrosion, cleanability, food-contact requirements, availability, cost, and expected service life.

## 7. Experimental Methodology

### 7.1 Sample Preparation and Reference Grading

1. Select representative onions and document variety, source, date, and storage condition.
2. Exclude or separately record onions that cannot safely enter the machine.
3. Measure each onion's reference diameter using the same defined method and instrument.
4. Assign the reference size class using cutoffs fixed before the test.
5. Record visible pre-existing damage so it can be distinguished from damage caused during grading.

### 7.2 Operating Variables

Test a planned range of drum speeds, drum slopes, and feed rates. For each condition, keep sample composition, machine setup, and measurement procedure consistent. Randomize run order where practical and perform at least three repeat runs per condition. A central-composite response-surface design is one option when enough trial time and sample material are available; the cited study used 13 combinations for speed and slope [1]. Determine sample size and run duration based on available material, expected variability, and project time; report these choices and any statistical limitations.

| Trial factor | Levels to select before testing | Measurement method |
|---|---|---|
| Drum speed | Low, medium, high within the safe design range; literature study tested approximately 3-17 rpm [1] | Tachometer |
| Drum slope | Low, medium, high within the safe design range; literature study tested approximately 1-7% [1] | Inclinometer or measured rise/run |
| Feed rate | Low, medium, high measured mass flow | Timed weighing |
| Repeat number | At least 3 per condition where feasible | Run log |
| Onion size class | Reference class by measured diameter | Calibrated caliper |

### 7.3 Run Procedure

1. Inspect guards, fasteners, electrical connections, and collection bins before each run.
2. Record the machine configuration, drum speed, drum slope, and feed mass.
3. Feed the sample at a controlled, measured rate; keep hands clear of the conveyor, drum inlet, and rotating drum.
4. Collect and label output from each perforation-zone outlet, the drum-end outlet, and any ungraded/missed onions.
5. Measure output mass and count by outlet.
6. Compare machine-assigned class against each onion's reference class.
7. Inspect for new cuts, bruising, skin loss, or other damage using the same criteria before and after the run.
8. Record run duration and energy consumption, then safely stop and isolate power before clearing jams or cleaning.

## 8. Performance Evaluation

Let $N$ be the total onions fed, $N_c$ the number placed in the correct reference class, $N_{ij}$ the number with reference class $i$ sent to machine outlet $j$, $M$ the mass processed in kilograms, $t$ the run time in hours, $E$ the electrical energy used in kilowatt-hours, and $N_{new}$ the number found to have new damage after grading.

### 8.1 Overall Grading Accuracy

$$
\text{Grading accuracy (\%)} = \frac{N_c}{N} \times 100
$$

Report the full confusion matrix as well as the overall value; otherwise, poor performance in one size class may be hidden.

### 8.2 Mass-Based Grading Efficiency

For comparison with the cited rotary-grader study, calculate the proportion of input mass correctly routed to its reference outlet:

$$
	ext{Mass-based grading efficiency (\%)} = \frac{\sum_i m_{i,\mathrm{correct}}}{M_{\mathrm{input}}} \times 100
$$

Here, $m_{i,\mathrm{correct}}$ is the mass of reference-class $i$ onions delivered to outlet $i$, and $M_{\mathrm{input}}$ is the total input mass. This follows the mass-based form reported by Bisen et al. [1]. Report it alongside count-based accuracy and the class-wise confusion matrix, not as a substitute for them.

### 8.3 Grade Purity and Grade Recovery

For outlet/class $i$:

$$
\text{Purity}_i (\%) = \frac{N_{ii}}{\sum_j N_{ji}} \times 100
$$

where $N_{ii}$ is the number of reference-class-$i$ onions in outlet $i$, and the denominator is all onions collected in outlet $i$.

$$
\text{Recovery}_i (\%) = \frac{N_{ii}}{\sum_j N_{ij}} \times 100
$$

where the denominator is all reference-class-$i$ onions fed to the machine. Define handling of missed or uncollected onions before calculating these metrics.

### 8.4 Throughput

$$
\text{Throughput (kg/h)} = \frac{M}{t}
$$

State whether $M$ includes all fed onions or only successfully collected output.

### 8.5 New Damage Rate

$$
\text{New damage rate (\%)} = \frac{N_{new}}{N} \times 100
$$

Assess pre-existing damage before the run and use written inspection criteria so natural defects are not counted as machine-caused damage.

### 8.6 Specific Energy Consumption

$$
\text{Specific energy (kWh/t)} = \frac{E}{M/1000}
$$

Use measured electrical energy over the run and report the mass basis used.

### 8.7 Optional Metrics

- **Mass balance (%):** collected output mass divided by input mass times 100.
- **Class-wise error (%):** misclassified onions for a reference class divided by onions in that reference class times 100.
- **Size uniformity within an outlet:** coefficient of variation of measured diameters, if relevant to the buyer's specification.

## 9. Data Recording Template

| Run | Drum speed (rpm) | Slope (%) | Feed rate (kg/h) | Input mass (kg) | Run time (min) | Energy (kWh) | Count accuracy (%) | Mass efficiency (%) | Throughput (kg/h) | New damage (%) | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | | | | | | | | | | | |
| 2 | | | | | | | | | | | |
| 3 | | | | | | | | | | | |

No experimental results are included in this proposal. Populate tables only with measured data and retain raw counts so results can be recalculated.

## 10. Safety and Maintenance

- Guard the rotating drum, shaft, conveyor drive, belts, gears, and pinch points.
- Provide a reachable stop control and isolate power before adjustment, jam clearing, or cleaning.
- Do not wear loose clothing or jewelry near rotating components; tie back long hair.
- Use appropriate electrical protection and have wiring reviewed by a qualified person.
- Limit feed drop height and adjust contact surfaces to reduce bruising.
- Clean and dry the machine after use; inspect drum perforations, liners, bearings, fasteners, and guards before each session.

## 11. Expected Outcomes

The project is expected to produce a documented perforated-drum prototype design, a fabricated rotary grader, a repeatable test method, class-wise performance data, and recommendations for drum speed, slope, and feed rate. The cited study's stated 20 tonnes/day and 92.99% efficiency are comparison context only; actual accuracy, capacity, damage rate, and energy consumption for this project remain unknown until trials are completed.

## 12. Limitations

Performance may vary with onion variety, shape, moisture, skin condition, size distribution, feed presentation, drum aperture geometry, surface material, speed, slope, and operator technique. A small prototype and limited samples may not represent commercial operation. Size grading alone does not assess internal quality, disease, weight, or food safety. Results should not be generalized beyond the tested machine configuration and sample conditions.

## 13. Suggested Work Plan

1. Confirm target market, size classes, capacity, and safety requirements.
2. Measure a pilot onion sample and complete design calculations.
3. Produce drawings and obtain design/safety review.
4. Fabricate and assemble the guarded prototype.
5. Conduct no-load checks and controlled pilot runs.
6. Run replicated performance trials and retain raw data.
7. Analyze class-wise results, identify limitations, and complete the final report.

## 14. Report Sections for Final Submission

The final academic report can use this proposal as its foundation and add: literature review with verified citations; detailed design drawings and calculations; fabrication photographs; bill of materials and cost; experimental raw data; confusion matrix; statistical analysis; results and discussion; conclusions based only on measured evidence; and recommendations.

## 15. References

1. Bisen RD, Bakane PH, Sakkalkar SR. Design, development and performance evaluation of rotary onion grader. *Journal of Food Science and Technology*. 2022;59(6):2370-2380. doi:[10.1007/s13197-021-05253-8](https://doi.org/10.1007/s13197-021-05253-8). PMCID: PMC9114269. [PubMed Central full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC9114269/).
