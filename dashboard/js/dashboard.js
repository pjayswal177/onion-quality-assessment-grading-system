const colors = { A: '#2e8b57', B: '#d99a1c', C: '#d2691e', REJECT: '#c0392b' };
const grades = ['A', 'B', 'C', 'REJECT'];
const counts = { A: 0, B: 0, C: 0, REJECT: 0 };
const onions = [];
const records = [];
const canvas = document.querySelector('#conveyor');
const context = canvas.getContext('2d');
const form = document.querySelector('#assessment-form');
const logBody = document.querySelector('#results-table');
const cameraX = 270;
const gates = { A: 470, B: 590, C: 710, REJECT: 830 };
let running = true;
let frame = 0;
let beltSpeed = 3;
let defectRate = 0.25;

function classify({ diameter, defects, rotFungus, weight, roundness }) {
  if (rotFungus || defects > 25) return 'REJECT';
  if (diameter >= 55 && weight >= 100 && roundness >= 0.85 && defects <= 2) return 'A';
  if (diameter >= 40 && weight >= 50 && roundness >= 0.70 && defects <= 8) return 'B';
  return 'C';
}

function gradeClass(grade) {
  return grade.toLowerCase();
}

function renderCounts() {
  const total = grades.reduce((sum, grade) => sum + counts[grade], 0);
  document.querySelector('#total-count').textContent = String(total).padStart(2, '0');
  document.querySelector('#reject-count').textContent = String(counts.REJECT).padStart(2, '0');
  grades.forEach((grade) => {
    const count = document.querySelector(`#count-${grade.toLowerCase()}`);
    const percent = document.querySelector(`#percent-${grade.toLowerCase()}`);
    if (count) count.textContent = counts[grade];
    if (percent) percent.textContent = `${total ? Math.round(counts[grade] * 100 / total) : 0}%`;
  });
}

function appendLog(record) {
  records.unshift(record);
  if (records.length > 40) records.pop();
  logBody.replaceChildren(...records.map((item) => {
    const row = document.createElement('tr');
    const values = [item.sample, `${item.diameter.toFixed(0)} mm`, `${item.defects.toFixed(1)}%`, `${item.weight} g`, item.roundness.toFixed(2), item.grade];
    values.forEach((value, index) => {
      const cell = document.createElement('td');
      if (index === values.length - 1) {
        const badge = document.createElement('span');
        badge.className = `table-grade ${gradeClass(item.grade)}`;
        badge.textContent = value;
        cell.append(badge);
      } else {
        cell.textContent = value;
      }
      row.append(cell);
    });
    return row;
  }));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function spawnOnion() {
  const diameter = randomBetween(30, 75);
  const defective = Math.random() < defectRate;
  const defectType = defective ? ['rot', 'fungus', 'cut', 'sprout'][Math.floor(Math.random() * 4)] : null;
  const defects = !defective ? randomBetween(0, 2) : (defectType === 'rot' || defectType === 'fungus' ? randomBetween(5, 35) : randomBetween(2, 18));
  const roundness = Math.random() < 0.85 ? randomBetween(0.86, 1) : randomBetween(0.6, 0.85);
  const weight = Math.max(5, Math.round((diameter / 10) ** 3 * 0.95 * roundness + randomBetween(-6, 6)));
  onions.push({ x: -35, y: 95 + randomBetween(-20, 20), diameter, defects, roundness, weight, defectType, rotFungus: defectType === 'rot' || defectType === 'fungus', grade: null, inspected: false, sorted: false });
}

function drawOnion(onion) {
  const radius = onion.diameter / 2;
  context.beginPath();
  context.ellipse(onion.x, onion.y, radius, radius * (onion.roundness >= 0.85 ? 0.9 : 0.72), 0, 0, Math.PI * 2);
  context.fillStyle = onion.defectType ? '#98704b' : '#c99a48';
  context.fill();
  context.strokeStyle = '#765934';
  context.lineWidth = 1;
  context.stroke();
  context.beginPath();
  context.moveTo(onion.x, onion.y - radius * 0.8);
  context.quadraticCurveTo(onion.x - 5, onion.y - radius - 9, onion.x + 2, onion.y - radius - 13);
  context.strokeStyle = '#667b42';
  context.stroke();
  if (onion.defectType) {
    context.beginPath();
    context.arc(onion.x + radius * 0.28, onion.y - radius * 0.12, Math.max(3, radius * Math.sqrt(onion.defects / 100)), 0, Math.PI * 2);
    context.fillStyle = onion.defectType === 'fungus' ? '#647d46' : '#533a2c';
    context.fill();
  }
  if (onion.grade) {
    context.strokeStyle = colors[onion.grade];
    context.lineWidth = 3;
    context.strokeRect(onion.x - radius - 4, onion.y - radius - 4, onion.diameter + 8, onion.diameter + 8);
    context.lineWidth = 1;
  }
}

function drawConveyor() {
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#303b35';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = 'rgba(255,255,255,.12)';
  for (let x = -(frame * beltSpeed % 42); x < width; x += 42) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  context.font = '12px Segoe UI, sans-serif';
  context.textAlign = 'center';
  context.fillStyle = '#f2f5ef';
  context.fillText('CAMERA', cameraX, 22);
  context.setLineDash([5, 4]);
  context.strokeStyle = '#e8eee7';
  context.strokeRect(cameraX - 31, 32, 62, height - 64);
  context.setLineDash([]);
  grades.forEach((grade) => {
    context.fillStyle = colors[grade];
    context.fillRect(gates[grade] - 7, 0, 14, 22);
    context.fillRect(gates[grade] - 7, height - 22, 14, 22);
    context.fillStyle = '#fff';
    context.fillText(grade === 'REJECT' ? 'REJ' : grade, gates[grade], height - 31);
  });
  onions.forEach(drawOnion);
}

function simulationStep() {
  frame += 1;
  if (frame % Math.max(15, Math.round(74 / beltSpeed)) === 0) spawnOnion();
  onions.forEach((onion) => {
    onion.x += beltSpeed;
    if (!onion.inspected && onion.x >= cameraX) {
      onion.inspected = true;
      onion.grade = classify(onion);
      appendLog({ ...onion, sample: `ON-${String(frame).padStart(5, '0')}` });
    }
    if (!onion.sorted && onion.grade && onion.x >= gates[onion.grade]) {
      onion.sorted = true;
      counts[onion.grade] += 1;
      renderCounts();
      onion.removed = true;
    }
  });
  for (let index = onions.length - 1; index >= 0; index -= 1) {
    if (onions[index].removed || onions[index].x > canvas.width + 40) onions.splice(index, 1);
  }
}

function animationFrame() {
  if (running) simulationStep();
  drawConveyor();
  requestAnimationFrame(animationFrame);
}

function showManualResult() {
  if (!form.checkValidity()) {
    const manualResult = document.querySelector('#manual-result');
    manualResult.className = 'manual-result';
    manualResult.textContent = 'Enter valid values for all measurements.';
    document.querySelector('#empty-result').hidden = false;
    document.querySelector('#result-content').hidden = true;
    return;
  }
  const measurements = {
    diameter: Number(document.querySelector('#diameter').value),
    defects: Number(document.querySelector('#defect-area').value),
    weight: Number(document.querySelector('#weight').value),
    roundness: Number(document.querySelector('#roundness').value),
    rotFungus: document.querySelector('#rot-fungus').checked
  };
  const grade = classify(measurements);
  const reasons = [];
  const manualResult = document.querySelector('#manual-result');
  manualResult.className = `manual-result grade-${gradeClass(grade)}`;
  manualResult.textContent = grade === 'REJECT' ? 'Result: REJECT' : `Result: Grade ${grade}`;
  document.querySelector('#empty-result').hidden = true;
  document.querySelector('#result-content').hidden = false;
  if (measurements.rotFungus) reasons.push('Rot / fungus was detected, so the onion is rejected.');
  else if (measurements.defects > 25) reasons.push('Defect area exceeds 25%, so the onion is rejected.');
  else if (grade === 'A') reasons.push('Meets every Grade A threshold: diameter ≥55 mm, weight ≥100 g, roundness ≥0.85, defects ≤2%.');
  else if (grade === 'B') reasons.push('Meets every Grade B threshold and does not meet all Grade A thresholds.');
  else reasons.push('Does not meet all Grade A or Grade B thresholds.');

  document.querySelector('#empty-result').hidden = true;
  document.querySelector('#result-content').hidden = false;
  document.querySelector('#result-grade').textContent = grade === 'REJECT' ? 'REJECT' : `Grade ${grade}`;
  const status = document.querySelector('#result-condition');
  status.textContent = grade === 'REJECT' ? 'SORT OUT' : 'PASS';
  status.className = `condition-pill ${gradeClass(grade)}`;
  document.querySelector('#result-diameter').textContent = `${measurements.diameter.toFixed(1)} mm`;
  document.querySelector('#result-defect').textContent = `${measurements.defects.toFixed(1)}%`;
  document.querySelector('#result-weight').textContent = `${measurements.weight.toFixed(1)} g`;
  document.querySelector('#result-roundness').textContent = measurements.roundness.toFixed(2);
  document.querySelector('#result-reasons').replaceChildren(...reasons.map((reason) => {
    const item = document.createElement('li');
    item.textContent = reason;
    return item;
  }));
}

form.addEventListener('input', showManualResult);
form.addEventListener('submit', (event) => event.preventDefault());
document.querySelector('#toggle-simulation').addEventListener('click', (event) => {
  running = !running;
  event.currentTarget.textContent = running ? 'Ⅱ' : '▶';
  event.currentTarget.title = running ? 'Pause simulation' : 'Resume simulation';
  event.currentTarget.setAttribute('aria-label', event.currentTarget.title);
});
document.querySelector('#defect-rate').addEventListener('input', (event) => {
  defectRate = Number(event.currentTarget.value) / 100;
  document.querySelector('#defect-rate-value').textContent = `${event.currentTarget.value}%`;
  document.querySelector('#defect-rate-display').textContent = `${event.currentTarget.value}%`;
});
document.querySelector('#belt-speed').addEventListener('input', (event) => {
  beltSpeed = Number(event.currentTarget.value);
  const displaySpeed = (beltSpeed / 10).toFixed(1);
  document.querySelector('#belt-speed-value').textContent = `${displaySpeed} m/s`;
  document.querySelector('#belt-speed-display').textContent = displaySpeed;
});
document.querySelector('#reset-counts').addEventListener('click', () => {
  grades.forEach((grade) => { counts[grade] = 0; });
  records.length = 0;
  onions.length = 0;
  logBody.replaceChildren();
  renderCounts();
});
document.querySelector('#export-csv').addEventListener('click', () => {
  const rows = [['sample', 'diameter_mm', 'defect_area_percent', 'weight_g', 'roundness', 'grade'], ...records.map((item) => [item.sample, item.diameter.toFixed(1), item.defects.toFixed(1), item.weight, item.roundness.toFixed(2), item.grade])];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sih26031-onion-inspection-log.csv';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

renderCounts();
showManualResult();
animationFrame();
