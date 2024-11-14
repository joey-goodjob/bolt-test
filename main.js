function calculateFortune(name, birthdate) {
    // 计算生肖
    const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const birthYear = new Date(birthdate).getFullYear();
    const zodiacIndex = (birthYear - 4) % 12;
    const zodiacSign = zodiacAnimals[zodiacIndex];

    // 计算星座
    const birthMonth = new Date(birthdate).getMonth() + 1;
    const birthDay = new Date(birthdate).getDate();
    let starSign = '';
    
    if ((birthMonth === 3 && birthDay >= 21) || (birthMonth === 4 && birthDay <= 19)) starSign = '白羊座';
    else if ((birthMonth === 4 && birthDay >= 20) || (birthMonth === 5 && birthDay <= 20)) starSign = '金牛座';
    else if ((birthMonth === 5 && birthDay >= 21) || (birthMonth === 6 && birthDay <= 21)) starSign = '双子座';
    else if ((birthMonth === 6 && birthDay >= 22) || (birthMonth === 7 && birthDay <= 22)) starSign = '巨蟹座';
    else if ((birthMonth === 7 && birthDay >= 23) || (birthMonth === 8 && birthDay <= 22)) starSign = '狮子座';
    else if ((birthMonth === 8 && birthDay >= 23) || (birthMonth === 9 && birthDay <= 22)) starSign = '处女座';
    else if ((birthMonth === 9 && birthDay >= 23) || (birthMonth === 10 && birthDay <= 23)) starSign = '天秤座';
    else if ((birthMonth === 10 && birthDay >= 24) || (birthMonth === 11 && birthDay <= 22)) starSign = '天蝎座';
    else if ((birthMonth === 11 && birthDay >= 23) || (birthMonth === 12 && birthDay <= 21)) starSign = '射手座';
    else if ((birthMonth === 12 && birthDay >= 22) || (birthMonth === 1 && birthDay <= 19)) starSign = '摩羯座';
    else if ((birthMonth === 1 && birthDay >= 20) || (birthMonth === 2 && birthDay <= 18)) starSign = '水瓶座';
    else starSign = '双鱼座';

    // 计算五行属性
    const elements = ['金', '木', '水', '火', '土'];
    const elementIndex = (birthYear + birthMonth + birthDay) % 5;
    const element = elements[elementIndex];

    // 计算运势评级和分数
    const score = Math.floor(Math.random() * 41) + 60; // 60-100之间的分数
    let rating;
    if (score >= 90) rating = '大吉';
    else if (score >= 80) rating = '吉';
    else if (score >= 70) rating = '中平';
    else rating = '小凶';

    // 生成运势内容
    const fortunes = {
        '大吉': {
            description: '今日运势极佳，诸事顺遂，贵人相助。',
            good: ['谈判签约', '投资理财', '求职面试', '开展新项目'],
            bad: ['过度操劳', '轻信他人']
        },
        '吉': {
            description: '运势良好，适合稳步推进各项计划。',
            good: ['工作会谈', '商业合作', '学习进修'],
            bad: ['冒险投机', '轻率决策']
        },
        '中平': {
            description: '运势平稳，宜守不宜进。',
            good: ['整理规划', '修身养性', '巩固关系'],
            bad: ['重大决策', '资金投入']
        },
        '小凶': {
            description: '运势欠佳，凡事需谨慎。',
            good: ['修身养性', '总结反思', '调整计划'],
            bad: ['签约合同', '重要会议', '出行旅游']
        }
    };

    // 生成结果
    const result = {
        name: name,
        zodiacSign: zodiacSign,
        starSign: starSign,
        element: element,
        score: score,
        rating: rating,
        description: fortunes[rating].description,
        goodFor: fortunes[rating].good,
        badFor: fortunes[rating].bad
    };

    return result;
}

// 处理表单提交
document.getElementById('fortuneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    
    const fortune = calculateFortune(name, birthdate);
    
    // 创建结果展示区域
    const resultHtml = `
        <div class="mt-8 p-6 bg-primary-100 rounded-xl">
            <h3 class="text-2xl font-bold mb-4">${fortune.name}的运势分析</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <p class="mb-2"><strong>生肖：</strong>${fortune.zodiacSign}</p>
                    <p class="mb-2"><strong>星座：</strong>${fortune.starSign}</p>
                    <p class="mb-2"><strong>五行：</strong>${fortune.element}</p>
                </div>
                <div>
                    <p class="mb-2"><strong>运势评级：</strong><span class="text-xl font-bold">${fortune.rating}</span></p>
                    <p class="mb-2"><strong>运势分数：</strong>${fortune.score}分</p>
                </div>
            </div>
            <div class="mt-4">
                <p class="mb-4"><strong>运势说明：</strong>${fortune.description}</p>
                <p class="mb-2"><strong>宜：</strong>${fortune.goodFor.join('、')}</p>
                <p><strong>忌：</strong>${fortune.badFor.join('、')}</p>
            </div>
        </div>
    `;
    
    // 在表单后插入结果
    const existingResult = document.querySelector('.fortune-result');
    if (existingResult) {
        existingResult.remove();
    }
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'fortune-result';
    resultDiv.innerHTML = resultHtml;
    document.getElementById('fortuneForm').after(resultDiv);
});