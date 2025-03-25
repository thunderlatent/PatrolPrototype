document.addEventListener('DOMContentLoaded', function() {
    const contentFrame = document.getElementById('content-frame');
    const bottomNav = document.getElementById('bottom-nav');
    const pageButtons = document.querySelectorAll('.page-button');
    const tabItems = document.querySelectorAll('.tab-item');
    const pageBtns = document.querySelectorAll('.page-btn'); // index.html 的頁面按鈕
    
    // index.html 初始化時隱藏底部導航欄（因為初始頁面是登入頁面）
    if (bottomNav && contentFrame) {
        if (contentFrame.src.includes('login.html')) {
            bottomNav.style.display = 'none';
        }
    }
    
    // 檢查URL參數以確定要載入的頁面
    const urlParams = new URLSearchParams(window.location.search);
    const pageName = urlParams.get('page');
    
    if (pageName && contentFrame) {
        // 載入參數指定的頁面
        contentFrame.src = pageName;
        
        // 處理底部導航欄顯示
        if (bottomNav) {
            if (pageName === 'login.html') {
                bottomNav.style.display = 'none';
            } else {
                bottomNav.style.display = 'flex';
                
                // 更新導航欄和按鈕激活狀態
                if (tabItems) {
                    tabItems.forEach(item => {
                        if (item.getAttribute('data-target') === pageName) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
                
                if (pageButtons) {
                    pageButtons.forEach(button => {
                        if (button.getAttribute('data-page') === pageName) {
                            button.classList.add('active-button');
                        } else {
                            button.classList.remove('active-button');
                        }
                    });
                }
            }
        }
    }
    
    // 監聽 iframe 的加載事件 (index.html)
    if (contentFrame) {
        contentFrame.addEventListener('load', function() {
            // 檢查當前頁面是否為登入頁面
            const isLoginPage = contentFrame.src.includes('login.html');
            if (isLoginPage) {
                if (bottomNav) bottomNav.style.display = 'none';
            } else {
                if (bottomNav) bottomNav.style.display = 'flex';
            }
        });
    }
    
    // 頁面選擇按鈕點擊事件
    if (pageButtons && contentFrame) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                
                // 檢查是否嘗試訪問管理頁面且用戶不是管理員
                if (page === 'admin.html' && localStorage.getItem('userRole') !== 'admin') {
                    alert('只有管理員才能訪問管理頁面');
                    return;
                }
                
                contentFrame.src = page;
                
                // 處理底部導航欄顯示
                if (bottomNav) {
                    if (page === 'login.html') {
                        bottomNav.style.display = 'none';
                    } else {
                        bottomNav.style.display = 'flex';
                        
                        // 更新導航欄激活狀態
                        if (tabItems) {
                            tabItems.forEach(item => {
                                if (item.getAttribute('data-target') === page) {
                                    item.classList.add('active');
                                } else {
                                    item.classList.remove('active');
                                }
                            });
                        }
                    }
                }
            });
        });
    }
    
    // index.html 中的頁面按鈕點擊事件
    if (pageBtns && contentFrame) {
        pageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-page');
                
                // 檢查是否嘗試訪問管理頁面且用戶不是管理員
                if (target === 'admin.html' && localStorage.getItem('userRole') !== 'admin') {
                    alert('只有管理員才能訪問管理頁面');
                    return;
                }
                
                contentFrame.src = target;
                
                // 更新導航欄激活狀態
                if (tabItems && bottomNav) {
                    tabItems.forEach(navItem => {
                        if (navItem.getAttribute('data-target') === target) {
                            navItem.classList.add('active');
                        } else {
                            navItem.classList.remove('active');
                        }
                    });
                    
                    // 如果切換到登入頁面，隱藏底部導航欄
                    if (target === 'login.html') {
                        bottomNav.style.display = 'none';
                    } else {
                        bottomNav.style.display = 'flex';
                    }
                }
            });
        });
    }
    
    // 底部導航欄點擊事件
    if (tabItems && contentFrame) {
        tabItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-target');
                
                // 檢查是否嘗試訪問管理頁面且用戶不是管理員
                if (page === 'admin.html' && localStorage.getItem('userRole') !== 'admin') {
                    alert('只有管理員才能訪問管理頁面');
                    return;
                }
                
                contentFrame.src = page;
                
                // 更新激活狀態
                tabItems.forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // 監聽來自 iframe 的消息
    window.addEventListener('message', function(event) {
        // 處理登入成功的消息
        if (event.data && event.data.type === 'login_success' && contentFrame) {
            const userRole = event.data.userRole;
            const redirectPage = event.data.redirect || 'home.html';
            
            // 導航到指定頁面
            contentFrame.src = redirectPage;
            
            // 顯示底部導航欄
            if (bottomNav) {
                bottomNav.style.display = 'flex';
                
                // 更新導航欄激活狀態
                if (tabItems) {
                    tabItems.forEach(item => {
                        if (item.getAttribute('data-target') === redirectPage) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
                
                // 如果不是管理員，隱藏管理選項
                if (userRole !== 'admin') {
                    const adminTab = bottomNav.querySelector('[data-target="admin.html"]');
                    if (adminTab) {
                        adminTab.style.display = 'none';
                    }
                    
                    // 同時隱藏頁面選擇器中的管理頁面按鈕
                    const adminPageBtn = document.querySelector('.page-button[data-page="admin.html"]');
                    if (adminPageBtn) {
                        adminPageBtn.style.display = 'none';
                    }
                }
            }
        }
        
        // 處理登出消息
        if (event.data && event.data.type === 'logout' && contentFrame) {
            // 導航到登入頁面
            contentFrame.src = 'login.html';
            
            // 隱藏底部導航欄
            if (bottomNav) {
                bottomNav.style.display = 'none';
            }
        }
    });
}); 