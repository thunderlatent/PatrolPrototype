// NFC 卡片功能相關代碼

// 檢測是否支持 NFC 功能
let isNfcSupported = 'NDEFReader' in window;

// NFC 卡片寫入功能（管理員專用）
function showNfcWriterModal() {
    // 檢查用戶是否為管理員
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
        showToast('權限不足', '只有管理員才能使用此功能', 'error');
        return;
    }
    
    // 顯示卡片掃描引導
    showCardScanningModal();
}

// 顯示 NFC 卡片掃描引導
function showCardScanningModal() {
    // 創建掃描模態窗口
    const modalHTML = `
        <div id="nfcScanningModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div class="bg-white rounded-2xl max-w-md w-full mx-4 shadow-xl p-6 text-center">
                <div class="relative w-40 h-40 mx-auto mb-6">
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div class="w-20 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                            <i class="fas fa-wifi text-gray-500 fa-rotate-90 text-3xl"></i>
                        </div>
                    </div>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-4 z-0">
                        <div class="w-14 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                            <div class="w-12 h-20 bg-black rounded-lg"></div>
                        </div>
                    </div>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 nfc-waves">
                        <div class="nfc-scanning-wave"></div>
                        <div class="nfc-scanning-wave animation-delay-300"></div>
                        <div class="nfc-scanning-wave animation-delay-600"></div>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">請掃描 NFC 卡片</h3>
                <p class="text-gray-600 mb-6">將卡片靠近設備以讀取現有資料</p>
                <button id="cancelNfcScanBtn" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    取消
                </button>
            </div>
        </div>
    `;
    
    // 插入到頁面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('cancelNfcScanBtn').addEventListener('click', closeNfcScanningModal);
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.id = 'nfcScanAnimationStyle';
    style.textContent = `
        .nfc-waves {
            width: 100%;
            height: 100%;
        }
        .nfc-scanning-wave {
            position: absolute;
            border: 2px solid #3b82f6;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: nfcWaveAnimation 2s infinite;
            opacity: 0;
        }
        .animation-delay-300 {
            animation-delay: 0.3s;
            width: 70px;
            height: 70px;
        }
        .animation-delay-600 {
            animation-delay: 0.6s;
            width: 90px;
            height: 90px;
        }
        @keyframes nfcWaveAnimation {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 模擬掃描過程 (實際應用中應使用 Web NFC API)
    setTimeout(() => {
        // 模擬讀取結果
        const isCardEmpty = Math.random() < 0.3; // 30% 機率是空卡
        closeNfcScanningModal();
        
        // 產生卡片資料
        let cardData = {};
        if (!isCardEmpty) {
            cardData = generateMockCardData();
        }
        
        // 顯示編輯表單
        showCardEditForm(cardData, !isCardEmpty);
    }, 2500);
}

// 關閉掃描模態窗口
function closeNfcScanningModal() {
    const modal = document.getElementById('nfcScanningModal');
    if (modal) {
        modal.remove();
    }
    
    const style = document.getElementById('nfcScanAnimationStyle');
    if (style) {
        style.remove();
    }
}

// 產生模擬的卡片資料
function generateMockCardData() {
    // 生成檢查點位置
    const locations = [
        '大門入口', '電梯大廳', '安全出口', '走廊轉角', 
        '機房入口', '屋頂天台', '消防栓', '監控室'
    ];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // 隨機樓層
    const floors = ['A棟', 'B棟', 'C棟', 'D棟'];
    const floor = floors[Math.floor(Math.random() * floors.length)];
    
    // 隨機生成有效的檢查點數據
    return {
        checkpointId: `CP${Math.floor(1000 + Math.random() * 9000)}`,
        checkpointName: `${floor}${location}`,
        lastUpdated: new Date().toISOString(),
        createdBy: 'admin'
    };
}

// 顯示卡片編輯表單
function showCardEditForm(cardData = {}, isExistingCard = false) {
    // 創建編輯表單模態窗口
    const modalHTML = `
        <div id="nfcEditorModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div class="bg-white rounded-2xl max-w-md w-full mx-4 shadow-xl">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-gray-800">
                            ${isExistingCard ? '編輯 NFC 卡片資料' : '填寫新卡片資料'}
                        </h3>
                        <button id="closeNfcEditorBtn" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="mb-4">
                        <div class="p-3 rounded-lg ${isExistingCard ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'} mb-4 flex items-start">
                            <i class="fas ${isExistingCard ? 'fa-info-circle text-blue-500' : 'fa-exclamation-triangle text-yellow-500'} text-lg mr-3 mt-0.5"></i>
                            <div>
                                ${isExistingCard 
                                    ? '<span class="font-medium">已讀取卡片資料</span><br>您可以檢視並修改現有資料後更新卡片' 
                                    : '<span class="font-medium">空白卡片</span><br>未檢測到現有資料，請填寫檢查點資訊'}
                            </div>
                        </div>
                    </div>
                    
                    <form id="nfcEditForm">
                        <!-- 檢查點 ID -->
                        <div class="mb-4">
                            <label for="checkpointId" class="block text-sm font-medium text-gray-700 mb-1">檢查點 ID</label>
                            <input type="text" id="checkpointId" name="checkpointId" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="輸入唯一識別碼 (例如: CP001)" value="${cardData.checkpointId || ''}">
                        </div>
                        
                        <!-- 檢查點名稱 -->
                        <div class="mb-4">
                            <label for="checkpointName" class="block text-sm font-medium text-gray-700 mb-1">檢查點名稱</label>
                            <input type="text" id="checkpointName" name="checkpointName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="輸入檢查點位置名稱" value="${cardData.checkpointName || ''}">
                        </div>
                        
                        ${isExistingCard ? `
                        <!-- 上次更新時間 -->
                        <div class="mb-4 text-sm text-gray-500">
                            <div>上次更新: ${formatDateTime ? formatDateTime(cardData.lastUpdated) : new Date(cardData.lastUpdated).toLocaleString()}</div>
                            <div>創建者: ${cardData.createdBy || 'admin'}</div>
                        </div>
                        ` : ''}
                    </form>
                    
                    <div class="flex justify-end">
                        <button id="cancelNfcEditBtn" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 mr-2 hover:bg-gray-50">
                            取消
                        </button>
                        <button id="startNfcWriteBtn" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            ${isExistingCard ? '更新卡片' : '寫入卡片'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 插入到頁面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 設置事件監聽
    document.getElementById('closeNfcEditorBtn').addEventListener('click', closeNfcEditorModal);
    document.getElementById('cancelNfcEditBtn').addEventListener('click', closeNfcEditorModal);
    document.getElementById('startNfcWriteBtn').addEventListener('click', () => validateAndWrite(isExistingCard));
}

// 關閉編輯模態窗口
function closeNfcEditorModal() {
    const modal = document.getElementById('nfcEditorModal');
    if (modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 驗證表單並開始寫入
function validateAndWrite(isUpdate = false) {
    // 獲取表單數據
    const checkpointId = document.getElementById('checkpointId').value;
    const checkpointName = document.getElementById('checkpointName').value;
    
    // 驗證表單
    if (!checkpointId || !checkpointName) {
        showToast('資料不完整', '請填寫所有必填欄位', 'error');
        return;
    }
    
    // 準備卡片資料
    const cardData = {
        checkpointId,
        checkpointName,
        lastUpdated: new Date().toISOString(),
        createdBy: 'admin'
    };
    
    // 關閉編輯表單
    closeNfcEditorModal();
    
    // 顯示寫入動畫
    showNfcWriteScanningAnimation(cardData, isUpdate);
}

// 顯示寫入動畫
function showNfcWriteScanningAnimation(cardData, isUpdate = false) {
    // 創建寫入掃描模態窗口
    const modalHTML = `
        <div id="nfcWriteScanningModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div class="bg-white rounded-2xl max-w-md w-full mx-4 shadow-xl p-6 text-center">
                <div class="relative w-48 h-40 mx-auto mb-6">
                    <!-- 手機 -->
                    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0">
                        <div class="w-24 h-36 bg-gray-800 rounded-xl flex items-center justify-center">
                            <div class="w-20 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div class="text-blue-500" id="phoneIcon">
                                    <i class="fas fa-arrow-down text-2xl animate-bounce"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 卡片 -->
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 nfc-card-animation">
                        <div class="w-32 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                            <div class="text-white text-xs font-bold">NFC 卡片</div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                                    <i class="fas fa-wifi text-white fa-rotate-90"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 寫入動畫 -->
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 write-waves hidden" id="writeWaves">
                        <div class="write-wave"></div>
                        <div class="write-wave animation-delay-300"></div>
                        <div class="write-wave animation-delay-600"></div>
                    </div>
                </div>
                
                <h3 class="text-xl font-bold text-gray-800 mb-2">
                    ${isUpdate ? '正在更新卡片資料' : '正在寫入卡片資料'}
                </h3>
                <p class="text-gray-600 mb-6" id="nfcPromptText">請將卡片靠近設備</p>
                
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div id="writeProgress" class="h-full bg-blue-500 rounded-full" style="width: 0%"></div>
                </div>
                
                <button id="cancelNfcWriteBtn" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    取消
                </button>
            </div>
        </div>
    `;
    
    // 插入到頁面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('cancelNfcWriteBtn').addEventListener('click', closeNfcWriteScanningModal);
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.id = 'nfcWriteAnimationStyle';
    style.textContent = `
        .nfc-card-animation {
            animation: slideDown 2s forwards;
            animation-delay: 1s;
        }
        
        @keyframes slideDown {
            0% { transform: translate(-50%, 0); }
            100% { transform: translate(-50%, 120%); }
        }
        
        .write-waves {
            width: 100%;
            height: 100%;
        }
        
        .write-wave {
            position: absolute;
            border: 2px solid #3b82f6;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: writeWaveAnimation 1.5s infinite;
            opacity: 0;
        }
        
        .animation-delay-300 {
            animation-delay: 0.3s;
            width: 40px;
            height: 40px;
        }
        
        .animation-delay-600 {
            animation-delay: 0.6s;
            width: 50px;
            height: 50px;
        }
        
        @keyframes writeWaveAnimation {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 模擬寫入過程
    simulateNfcWriteProcess(cardData, isUpdate);
}

// 關閉寫入掃描模態窗口
function closeNfcWriteScanningModal() {
    const modal = document.getElementById('nfcWriteScanningModal');
    if (modal) {
        modal.remove();
    }
    
    const style = document.getElementById('nfcWriteAnimationStyle');
    if (style) {
        style.remove();
    }
}

// 模擬 NFC 寫入過程
function simulateNfcWriteProcess(cardData, isUpdate) {
    const promptText = document.getElementById('nfcPromptText');
    const progressBar = document.getElementById('writeProgress');
    const phoneIcon = document.getElementById('phoneIcon');
    const writeWaves = document.getElementById('writeWaves');
    const cancelBtn = document.getElementById('cancelNfcWriteBtn');
    
    // 第一階段：等待卡片靠近 (1秒後自動進行)
    setTimeout(() => {
        // 第二階段：卡片已靠近，開始寫入
        promptText.textContent = '檢測到卡片，正在進行寫入...';
        
        // 顯示寫入動畫
        phoneIcon.innerHTML = '<i class="fas fa-pen-alt text-2xl"></i>';
        writeWaves.classList.remove('hidden');
        
        // 更新進度
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // 隨機模擬成功/失敗 (實際應用中應基於真實寫入結果)
                const isSuccess = Math.random() > 0.2; // 80% 成功率
                
                if (isSuccess) {
                    // 寫入成功
                    phoneIcon.innerHTML = '<i class="fas fa-check-circle text-3xl text-green-500"></i>';
                    writeWaves.classList.add('hidden');
                    promptText.textContent = '卡片寫入成功！';
                    cancelBtn.textContent = '完成';
                    
                    // 儲存卡片資料到本地 (模擬)
                    saveCardData(cardData);
                    
                    // 顯示成功通知
                    setTimeout(() => {
                        closeNfcWriteScanningModal();
                        showWriteResult(true, cardData, isUpdate);
                    }, 1500);
                } else {
                    // 寫入失敗
                    phoneIcon.innerHTML = '<i class="fas fa-exclamation-circle text-3xl text-red-500"></i>';
                    writeWaves.classList.add('hidden');
                    promptText.textContent = '卡片寫入失敗，請重試';
                    cancelBtn.textContent = '關閉';
                    
                    // 顯示失敗通知
                    setTimeout(() => {
                        closeNfcWriteScanningModal();
                        showWriteResult(false);
                    }, 1500);
                }
            }
        }, 150);
    }, 2500); // 等待卡片動畫完成後
}

// 儲存卡片資料 (模擬)
function saveCardData(cardData) {
    // 在實際應用中，這裡可能會將資料保存到後端資料庫
    // 這裡僅作為示範，將資料保存到 localStorage
    
    // 獲取現有卡片數據
    let savedCards = localStorage.getItem('nfcCards');
    let cardsArray = [];
    
    if (savedCards) {
        try {
            cardsArray = JSON.parse(savedCards);
        } catch (error) {
            console.error('解析已保存卡片數據時出錯', error);
            cardsArray = [];
        }
    }
    
    // 檢查是否已存在相同 ID 的卡片
    const existingIndex = cardsArray.findIndex(card => card.checkpointId === cardData.checkpointId);
    
    if (existingIndex >= 0) {
        // 更新現有卡片
        cardsArray[existingIndex] = cardData;
    } else {
        // 添加新卡片
        cardsArray.push(cardData);
    }
    
    // 保存回 localStorage
    try {
        localStorage.setItem('nfcCards', JSON.stringify(cardsArray));
    } catch (error) {
        console.error('保存卡片數據時出錯', error);
    }
}

// 顯示寫入結果通知
function showWriteResult(isSuccess, cardData = null, isUpdate = false) {
    let title, message, type;
    
    if (isSuccess) {
        title = isUpdate ? '卡片已更新' : '卡片已寫入';
        message = isUpdate 
            ? `已成功更新檢查點 "${cardData.checkpointName}" 的卡片資料` 
            : `已成功寫入檢查點 "${cardData.checkpointName}" 的卡片資料`;
        type = 'success';
    } else {
        title = '寫入失敗';
        message = '卡片寫入過程中發生錯誤，請檢查NFC連接並重試';
        type = 'error';
    }
    
    // 使用系統的通知功能來顯示訊息
    showToast(title, message, type);
}

// 顯示通知消息 (依賴於應用程式的通知系統)
function showToast(title, message, type = 'info') {
    // 檢查是否存在全域的 showToast 函數
    if (typeof window.showToast === 'function') {
        window.showToast(title, message, type);
        return;
    }
    
    // 否則創建一個簡單的通知界面
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="fixed top-4 right-4 max-w-md bg-white rounded-lg shadow-lg overflow-hidden p-0 transform transition-all duration-300 translate-x-full z-50">
            <div class="flex items-center">
                <div class="p-3 ${getToastColorClass(type)}">
                    <i class="fas ${getToastIcon(type)} text-white"></i>
                </div>
                <div class="p-3">
                    <h4 class="font-bold">${title}</h4>
                    <p class="text-sm text-gray-600">${message}</p>
                </div>
                <button class="mr-2 text-gray-400 hover:text-gray-600" onclick="document.getElementById('${toastId}').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    // 插入到頁面
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    
    // 顯示通知
    setTimeout(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.remove('translate-x-full');
        }
    }, 10);
    
    // 自動隱藏
    setTimeout(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// 獲取通知顏色
function getToastColorClass(type) {
    switch (type) {
        case 'success': return 'bg-green-500';
        case 'error': return 'bg-red-500';
        case 'warning': return 'bg-yellow-500';
        default: return 'bg-blue-500';
    }
}

// 獲取通知圖標
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// 在頁面加載時檢查並設置 NFC 相關功能
document.addEventListener('DOMContentLoaded', function() {
    // 檢查是否可使用 NFC
    const nfcStatus = isNfcSupported ? '可用' : '不可用';
    console.log(`NFC 功能: ${nfcStatus}`);
    
    // 添加管理員按鈕監聽 (如果存在)
    const nfcButton = document.getElementById('nfcWriteButton');
    if (nfcButton) {
        nfcButton.addEventListener('click', showNfcWriterModal);
    }
    
    // 註冊將來可能添加的其他 NFC 功能按鈕
    document.addEventListener('click', function(event) {
        // 檢查點擊的元素是否有特定的 data 屬性
        if (event.target.dataset.action === 'nfcWrite') {
            showNfcWriterModal();
        }
    });
}); 