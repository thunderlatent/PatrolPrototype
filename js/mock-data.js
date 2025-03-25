// mock-data.js - 測試數據

/**
 * 初始化測試數據
 */
function initMockData() {
    // 設置用戶角色為管理員
    localStorage.setItem('userRole', 'admin');
    
    // 設置用戶信息
    const userInfo = {
        id: 'admin123',
        name: '王大明',
        role: 'admin',
        department: '安全部',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // 設置巡邏路線數據
    const routeData = {
        'route-a-morning': {
            id: 'route-a-morning',
            name: 'A 棟巡邏路線 (早班)',
            checkpoints: [
                { name: 'A棟大門', time: '08:00', status: 'pending' },
                { name: 'A棟電梯大廳', time: '08:10', status: 'pending' },
                { name: '2樓走廊', time: '08:20', status: 'pending' },
                { name: '機房入口', time: '08:30', status: 'pending' },
                { name: '屋頂天台', time: '08:45', status: 'pending' }
            ]
        },
        'route-a-evening': {
            id: 'route-a-evening',
            name: 'A 棟巡邏路線 (晚班)',
            checkpoints: [
                { name: 'A棟大門', time: '19:00', status: 'pending' },
                { name: 'A棟電梯大廳', time: '19:10', status: 'pending' },
                { name: '2樓走廊', time: '19:20', status: 'pending' },
                { name: '機房入口', time: '19:30', status: 'pending' },
                { name: '屋頂天台', time: '19:45', status: 'pending' }
            ]
        },
        'route-b-morning': {
            id: 'route-b-morning',
            name: 'B 棟巡邏路線 (早班)',
            checkpoints: [
                { name: 'B棟大門', time: '08:00', status: 'pending' },
                { name: 'B棟電梯大廳', time: '08:15', status: 'pending' },
                { name: '3樓走廊', time: '08:30', status: 'pending' },
                { name: '機房入口', time: '08:45', status: 'pending' },
                { name: '屋頂天台', time: '09:00', status: 'pending' }
            ]
        },
        'route-b-evening': {
            id: 'route-b-evening',
            name: 'B 棟巡邏路線 (晚班)',
            checkpoints: [
                { name: 'B棟大門', time: '19:00', status: 'pending' },
                { name: 'B棟電梯大廳', time: '19:15', status: 'pending' },
                { name: '3樓走廊', time: '19:30', status: 'pending' },
                { name: '機房入口', time: '19:45', status: 'pending' },
                { name: '屋頂天台', time: '20:00', status: 'pending' }
            ]
        }
    };
    
    // 儲存路線數據
    localStorage.setItem('routeData', JSON.stringify(routeData));
    
    console.log('測試數據已初始化');
    showToast('測試模式', '已載入模擬數據', 'info');
}

// 頁面載入後初始化測試數據
document.addEventListener('DOMContentLoaded', function() {
    // 檢查是否已初始化
    if (!localStorage.getItem('mockDataInitialized')) {
        initMockData();
        localStorage.setItem('mockDataInitialized', 'true');
    }
}); 