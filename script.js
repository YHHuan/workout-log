// 預設訓練動作 - 包含所有主要動作與輔助訓練
const defaultExercises = [
    // 主要訓練動作
    {
        id: 1,
        name: '保加利亞分腿蹲',
        category: '腿部推',
        notes: '後腳腳背掛在椅上，重心放在前腳。下蹲時膝蓋對準第 2-3 根腳趾，避免內扣。'
    },
    {
        id: 2,
        name: '單手肩推',
        category: '垂直推',
        notes: '單手持啞鈴舉至肩部。核心收緊，將啞鈴垂直向上推舉，手臂貼近耳朵。'
    },
    {
        id: 3,
        name: '單腿硬舉',
        category: '腿部拉',
        notes: '單腳站立，支撐腳膝蓋微彎。上半身前傾，同時將另一腿向後延伸，保持骨盆水平。'
    },
    {
        id: 4,
        name: '單手划船',
        category: '水平拉',
        notes: '單膝跪於長凳，同側手支撐。另一手持啞鈴向身體側後方拉起，感受背肌收縮。'
    },
    {
        id: 5,
        name: '單手臥推',
        category: '水平推',
        notes: '仰臥於長凳，單手持啞鈴。核心用力，將啞鈴向上推舉。'
    },
    // 輔助訓練
    {
        id: 6,
        name: '呼吸練習',
        category: '核心訓練',
        notes: '採熊爬姿勢，單手墊高。專注於同側脊椎收縮，吸氣時感受對側背部擴張，吐氣時感受前側腹部深層撐開。'
    },
    {
        id: 7,
        name: '側棒式',
        category: '核心訓練',
        notes: '前臂與肩膀呈一直線垂直於地面，五指張開。膝蓋可選擇前屈 90 度（較難）或後勾 90 度（較易）。吐氣時將膝蓋與臀部撐起。'
    },
    {
        id: 8,
        name: '單腳超人式',
        category: '核心訓練',
        notes: '類似單腿硬舉，同手同腳分別向前與向後延伸。支撐腳臀部保持高度，避免股四頭肌過度出力。'
    },
    {
        id: 9,
        name: '死蟲式',
        category: '核心訓練',
        notes: '背部完全貼平地面，全程保持核心穩定。對側膝蓋與手之間可夾滾筒維持中立位。緩慢移動對側手與腳。'
    },
    {
        id: 10,
        name: '熊爬',
        category: '核心訓練',
        notes: '反向死蟲式。背部保持平坦，用手將地面向上撐起。先從原地抬起對側手腳開始，熟悉後再進行前後或側面移動。'
    },
    // 跑者膝蓋復健動作
    {
        id: 11,
        name: 'Peterson Step-down',
        category: '跑者膝蓋復健',
        notes: '站在小踏板上，一腳懸空。支撐腳慢慢下蹲，直到懸空腳跟觸地。強調離心控制，動作要慢。'
    },
    {
        id: 12,
        name: 'Copenhagen Plank',
        category: '跑者膝蓋復健',
        notes: '側撐，上方腳擱在凳子上，下方腳懸空。維持身體直線，強化內收肌群與核心穩定。'
    },
    {
        id: 13,
        name: '後側步',
        category: '跑者膝蓋復健',
        notes: '不要跨太多可以負重。讓臀部出力練習煞車會很酸，腳跟要感覺到出力。'
    },
    {
        id: 14,
        name: '馬克 B 腳後收',
        category: '跑者膝蓋復健',
        notes: '常常無力要小心。專注於腳後收的爆發力和控制。'
    },
    {
        id: 15,
        name: 'V 字往前爬',
        category: '跑者膝蓋復健',
        notes: '膝蓋打直。模擬爬行動作，強化核心與肩部穩定。'
    },
    {
        id: 16,
        name: '熊爬前後跟側面版本',
        category: '跑者膝蓋復健',
        notes: '熊爬的變化式，包括前後移動和側面移動。增加動態穩定性訓練。'
    },
    {
        id: 17,
        name: '槓鈴划船',
        category: '跑者膝蓋復健',
        notes: '手臂貼耳朵，不要太外開。強化背部與核心穩定。'
    },
    {
        id: 18,
        name: '彈力帶踝關節訓練',
        category: '跑者膝蓋復健',
        notes: '彈力帶進行左 ABD/ADD + 內旋。提升踝關節穩定性與本體感覺。'
    }
];

// 全局變數
let currentUnit = 'lb'; // 'lb' 或 'kg'

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeDate();
    loadUnitPreference();
    loadExercises();
    setupEventListeners();
});

// 初始化日期
function initializeDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateStr = today.toLocaleDateString('zh-TW', options);
    document.getElementById('todayDate').textContent = dateStr;
}

// 設定事件監聽
function setupEventListeners() {
    document.getElementById('addExerciseBtn').addEventListener('click', openAddExerciseModal);
    document.getElementById('addExerciseForm').addEventListener('submit', handleAddExercise);
    document.getElementById('unitToggleBtn').addEventListener('click', toggleUnit);
}

// 加載單位偏好設定
function loadUnitPreference() {
    const savedUnit = localStorage.getItem('preferredUnit');
    if (savedUnit) {
        currentUnit = savedUnit;
        updateUnitDisplay();
    }
}

// 切換單位
function toggleUnit() {
    currentUnit = currentUnit === 'lb' ? 'kg' : 'lb';
    localStorage.setItem('preferredUnit', currentUnit);
    updateUnitDisplay();
    loadExercises();
}

// 更新單位顯示
function updateUnitDisplay() {
    const btn = document.getElementById('unitToggleBtn');
    const nextUnit = currentUnit === 'lb' ? 'kg' : 'lb';
    btn.textContent = `⚖️ 切換單位 (${nextUnit})`;
}

// 轉換重量單位
function convertWeight(weight, fromUnit, toUnit) {
    if (fromUnit === toUnit) return weight;
    if (fromUnit === 'lb' && toUnit === 'kg') {
        return (weight / 2.20462).toFixed(1);
    }
    if (fromUnit === 'kg' && toUnit === 'lb') {
        return (weight * 2.20462).toFixed(1);
    }
    return weight;
}

// 打開新增動作模態框
function openAddExerciseModal() {
    document.getElementById('addExerciseModal').classList.remove('hidden');
}

// 關閉新增動作模態框
function closeAddExerciseModal() {
    document.getElementById('addExerciseModal').classList.add('hidden');
    document.getElementById('addExerciseForm').reset();
}

// 處理新增動作
function handleAddExercise(e) {
    e.preventDefault();
    
    const name = document.getElementById('newExerciseName').value.trim();
    const category = document.getElementById('newExerciseCategory').value.trim();
    const notes = document.getElementById('newExerciseNotes').value.trim();

    if (!name) {
        showNotification('❌ 請輸入動作名稱', 'error');
        return;
    }

    let exercises = getExercisesFromStorage();
    
    // 檢查是否已存在相同名稱
    if (exercises.some(ex => ex.name === name)) {
        showNotification('❌ 此動作已存在', 'error');
        return;
    }

    const newExercise = {
        id: Date.now(),
        name,
        category: category || '其他',
        notes: notes || ''
    };

    exercises.push(newExercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));
    
    closeAddExerciseModal();
    loadExercises();
    showNotification('✅ 動作已新增！', 'success');
}

// 從 localStorage 獲取動作列表（帶有容錯機制）
function getExercisesFromStorage() {
    try {
        let exercises = JSON.parse(localStorage.getItem('exercises'));
        
        // 如果 exercises 不存在、為 null、或不是陣列，使用預設動作
        if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
            localStorage.setItem('exercises', JSON.stringify(defaultExercises));
            return defaultExercises;
        }
        
        return exercises;
    } catch (e) {
        // 如果 JSON 解析失敗，使用預設動作
        localStorage.setItem('exercises', JSON.stringify(defaultExercises));
        return defaultExercises;
    }
}

// 加載並顯示所有動作
function loadExercises() {
    const exercises = getExercisesFromStorage();
    const grid = document.getElementById('exercisesGrid');
    
    if (exercises.length === 0) {
        grid.innerHTML = '<p class="empty-state">尚無動作，點擊「新增動作」開始建立。</p>';
        return;
    }

    grid.innerHTML = exercises.map(exercise => createExerciseCard(exercise)).join('');
}

// 創建動作卡片
function createExerciseCard(exercise) {
    const logs = getExerciseLogs(exercise.id);
    const recentLog = logs.length > 0 ? logs[0] : null;

    // 計算重量顯示（根據當前單位轉換）
    let displayWeight = '';
    if (recentLog) {
        const storedWeight = recentLog.weight;
        displayWeight = currentUnit === 'kg' ? convertWeight(storedWeight, 'lb', 'kg') : storedWeight;
    }

    return `
        <div class="exercise-card">
            <div class="exercise-card-header">
                <div>
                    <div class="exercise-card-title">${exercise.name}</div>
                    ${exercise.category ? `<span class="exercise-card-category">${exercise.category}</span>` : ''}
                </div>
                <button class="btn-delete-exercise" onclick="deleteExercise(${exercise.id})">🗑️</button>
            </div>
            
            ${exercise.notes ? `<div class="exercise-notes">💡 ${exercise.notes}</div>` : ''}
            
            <!-- Collapsible Log Section -->
            <button class="log-toggle-btn" onclick="toggleLogContent(${exercise.id})">
                <span>📝 展開紀錄</span>
                <span class="toggle-icon">▼</span>
            </button>
            
            <div class="log-content" id="log-content-${exercise.id}">
                <div class="log-form">
                    <div class="log-form-row">
                        <div class="log-form-group">
                            <label>重量 (${currentUnit})</label>
                            <input type="number" class="weight-input-${exercise.id}" step="0.5" placeholder="20" ${recentLog ? `value="${displayWeight}"` : ''}>
                        </div>
                        <div class="log-form-group">
                            <label>組數</label>
                            <input type="number" class="sets-input-${exercise.id}" min="1" placeholder="6" ${recentLog ? `value="${recentLog.sets}"` : 'value="6"'}>
                        </div>
                        <div class="log-form-group">
                            <label>次數</label>
                            <input type="number" class="reps-input-${exercise.id}" min="1" placeholder="5" ${recentLog ? `value="${recentLog.reps}"` : 'value="5"'}>
                        </div>
                    </div>
                    <div class="log-form-buttons">
                        <button type="button" class="btn-save-log" onclick="saveLog(${exercise.id})">💾 保存</button>
                        <button type="button" class="btn-clear-log" onclick="clearLogInputs(${exercise.id})">清空</button>
                    </div>
                </div>

                <div class="log-history" id="history-${exercise.id}">
                    ${logs.length > 0 ? logs.map((log, index) => {
                        const displayLogWeight = currentUnit === 'kg' ? convertWeight(log.weight, 'lb', 'kg') : log.weight;
                        return `
                        <div class="log-entry">
                            <div class="log-entry-info">
                                <div class="log-entry-date">${log.date}</div>
                                <div class="log-entry-data">${displayLogWeight}${currentUnit} × ${log.sets}組 × ${log.reps}次</div>
                            </div>
                            <button class="btn-delete-log" onclick="deleteLog(${exercise.id}, ${index})">✕</button>
                        </div>
                    `;
                    }).join('') : '<p class="empty-state">尚無紀錄</p>'}
                </div>
            </div>
        </div>
    `;
}

// 切換紀錄內容的顯示/隱藏
function toggleLogContent(exerciseId) {
    const logContent = document.getElementById(`log-content-${exerciseId}`);
    const toggleBtn = event.target.closest('.log-toggle-btn');
    
    logContent.classList.toggle('active');
    toggleBtn.classList.toggle('active');
}

// 保存訓練紀錄
function saveLog(exerciseId) {
    const weightInput = document.querySelector(`.weight-input-${exerciseId}`).value;
    const sets = document.querySelector(`.sets-input-${exerciseId}`).value;
    const reps = document.querySelector(`.reps-input-${exerciseId}`).value;

    if (!weightInput || !sets || !reps) {
        showNotification('❌ 請填入所有欄位', 'error');
        return;
    }

    // 將輸入的重量轉換為 lb 存儲（統一單位）
    const weightInLb = currentUnit === 'kg' ? convertWeight(parseFloat(weightInput), 'kg', 'lb') : parseFloat(weightInput);

    const today = new Date();
    const dateStr = today.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const log = {
        date: dateStr,
        weight: parseFloat(weightInLb),
        sets: parseInt(sets),
        reps: parseInt(reps)
    };

    let logs = JSON.parse(localStorage.getItem(`logs-${exerciseId}`)) || [];
    logs.unshift(log);
    localStorage.setItem(`logs-${exerciseId}`, JSON.stringify(logs));

    clearLogInputs(exerciseId);
    loadExercises();
    showNotification('✅ 紀錄已保存！', 'success');
}

// 清空紀錄輸入框
function clearLogInputs(exerciseId) {
    document.querySelector(`.weight-input-${exerciseId}`).value = '';
    document.querySelector(`.sets-input-${exerciseId}`).value = '6';
    document.querySelector(`.reps-input-${exerciseId}`).value = '5';
}

// 獲取動作的訓練紀錄
function getExerciseLogs(exerciseId) {
    const logs = JSON.parse(localStorage.getItem(`logs-${exerciseId}`)) || [];
    return logs;
}

// 刪除單條紀錄
function deleteLog(exerciseId, index) {
    if (confirm('確定要刪除這條紀錄嗎？')) {
        let logs = JSON.parse(localStorage.getItem(`logs-${exerciseId}`)) || [];
        logs.splice(index, 1);
        localStorage.setItem(`logs-${exerciseId}`, JSON.stringify(logs));
        loadExercises();
        showNotification('✅ 紀錄已刪除', 'success');
    }
}

// 刪除整個動作
function deleteExercise(exerciseId) {
    if (confirm('確定要刪除這個動作嗎？')) {
        let exercises = getExercisesFromStorage();
        exercises = exercises.filter(ex => ex.id !== exerciseId);
        localStorage.setItem('exercises', JSON.stringify(exercises));
        localStorage.removeItem(`logs-${exerciseId}`);
        loadExercises();
        showNotification('✅ 動作已刪除', 'success');
    }
}

// 顯示通知
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}
