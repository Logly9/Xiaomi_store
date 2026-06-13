var navItems = document.querySelectorAll(".nav > li");
var openList = null;   // 当前展开的面板

for (var i = 0; i < navItems.length; i++) {
    // 鼠标进入菜单项
    navItems[i].addEventListener("mouseenter", function () {
        var list = this.querySelector(".nav-list");
        if (!list) return;

        // 如果鼠标指向的面板已经打开，不做任何事
        if (openList === list) return;

        // 如果之前有打开的面板，说明是从其他菜单项切换过来 → 无动画切换
        if (openList) {
            // 立即隐藏旧面板，无动画
            openList.style.transition = "none";
            openList.classList.remove("open");
            openList.style.display = "none";
        }

        // 显示新面板
        // 判断是否需要动画：首次展开（openList 为空）时才有动画，否则无动画
        if (openList === null) {
            // 首次展开，带动画
            list.style.transition = "";   // 恢复默认过渡
            list.style.display = "block";
            list.offsetHeight;            // 强制回流
            list.classList.add("open");
        } else {
            // 切换（从另一菜单项移入），无动画
            list.style.transition = "none";
            list.style.display = "block";
            list.classList.add("open");   // 保证后续离开时能触发动画
        }

        openList = list;

        // 高亮当前菜单项（可选）
        for (var k = 0; k < navItems.length; k++) {
            navItems[k].classList.remove("active");
        }
        this.classList.add("active");
    });

    // 鼠标离开菜单项
    navItems[i].addEventListener("mouseleave", function (e) {
        var list = this.querySelector(".nav-list");
        if (!list) return;

        // 检查鼠标是否移到了另一个菜单项
        var related = e.relatedTarget;
        var isGoingToNavItem = false;
        for (var j = 0; j < navItems.length; j++) {
            if (navItems[j] === related || navItems[j].contains(related)) {
                isGoingToNavItem = true;
                break;
            }
        }

        if (isGoingToNavItem) {
            // 切换到其他菜单项，不处理（由 mouseenter 负责）
            return;
        }

        // 离开导航区域，带动画收回
        list.style.transition = "";   // 恢复默认过渡
        list.classList.remove("open");
        // 此时 openList 还是这个 list，但动画结束后会隐藏
        // 不需要立即清空 openList，在 transitionend 里处理
    });
}

// 监听过渡结束事件
document.addEventListener("transitionend", function (e) {
    if (e.target.classList.contains("nav-list") && !e.target.classList.contains("open")) {
        // 动画结束并且面板已关闭
        e.target.style.display = "none";
        if (openList === e.target) {
            openList = null;   // 清空已关闭的面板
        }
    }
});

// 额外处理：如果鼠标完全离开整个导航区域时，也触发关闭动画（保险）
var navContainer = document.querySelector(".nav");
if (navContainer) {
    navContainer.addEventListener("mouseleave", function () {
        if (openList) {
            openList.style.transition = "";
            openList.classList.remove("open");
            // transitionend 会负责隐藏和清空 openList
        }
    });
}