// common.js - 共通函數庫

/**
 * 顯示提示訊息
 * @param {string} title - 提示標題
 * @param {string} message - 提示訊息內容
 * @param {string} type - 提示類型 (success, error, info)
 */
function showToast(title, message, type = 'success') {
    // 檢查是否已經存在相同的 toast
    const existingToasts = document.querySelectorAll('.toast');
    for (let i = 0; i < existingToasts.length; i++) {
        const existingTitle = existingToasts[i].querySelector('.toast-title')?.textContent;
        const existingMessage = existingToasts[i].querySelector('.toast-message')?.textContent;
        if (existingTitle === title && existingMessage === message) {
            return; // 已存在相同內容的 toast，不重複顯示
        }
    }
    
    // 創建 toast 元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // 設置 toast 內容
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentNode.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加到頁面
    document.body.appendChild(toast);
    
    // 顯示動畫
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 自動關閉
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * 格式化日期時間
 * @param {Date|string} date - 日期對象或日期字符串
 * @param {string} format - 格式化字符串
 * @returns {string} 格式化後的日期字符串
 */
function formatDateTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * 從 localStorage 獲取數據
 * @param {string} key - 存儲鍵
 * @param {any} defaultValue - 預設值
 * @returns {any} 存儲的數據或預設值
 */
function getFromStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error('從 localStorage 獲取數據時出錯:', error);
        return defaultValue;
    }
}

/**
 * 保存數據到 localStorage
 * @param {string} key - 存儲鍵
 * @param {any} value - 要存儲的數據
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('保存數據到 localStorage 時出錯:', error);
        showToast('存儲失敗', '數據保存時出現錯誤，請檢查存儲空間', 'error');
    }
}

/**
 * 驗證用戶角色權限
 * @param {string|Array} requiredRoles - 需要的角色或角色列表
 * @returns {boolean} 是否擁有權限
 */
function hasRole(requiredRoles) {
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole) {
        return false;
    }
    
    if (Array.isArray(requiredRoles)) {
        return requiredRoles.includes(userRole);
    }
    
    return userRole === requiredRoles;
} 