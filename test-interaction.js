// 测试交互功能的简单脚本
console.log('交互测试脚本已加载');

// 测试按钮点击
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM已加载');
  
  // 测试季节切换按钮
  const seasonButton = document.querySelector('button[title*="切换"]');
  if (seasonButton) {
    console.log('找到季节切换按钮');
    seasonButton.addEventListener('click', function() {
      console.log('季节切换按钮被点击！');
    });
  } else {
    console.log('未找到季节切换按钮');
  }
  
  // 测试导航按钮
  const navButtons = document.querySelectorAll('nav button');
  console.log(`找到 ${navButtons.length} 个导航按钮`);
  navButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      console.log(`导航按钮 ${index + 1} 被点击`);
    });
  });
  
  // 测试开始冒险按钮
  const ctaButton = document.querySelector('button:contains("开始冒险")');
  if (ctaButton) {
    console.log('找到开始冒险按钮');
  } else {
    console.log('未找到开始冒险按钮，尝试其他选择器');
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      console.log(`按钮 ${index}:`, button.textContent?.trim());
    });
  }
});