// ============================================
// IMAGE URL BASE - Your GitHub repository
// ============================================
// ============================================
// CARD BACK DRAWING ENGINE
// ============================================
// ===== BGM =====
let bgmAudio = null;
function initBGM() {
    if (bgmAudio) return;
    bgmAudio = new Audio('./assets/audio/bgm.mp3');
    bgmAudio.onerror = function() {
        bgmAudio.onerror = null;
        bgmAudio.src = './assets/audio/bgm.mp3';
};
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
}
function startBGM() {
    initBGM();
    bgmAudio.play().catch(()=>{});
}
function stopBGM() {
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
    }
}
function drawCardBack(canvas, w, h) {
    canvas.width = w; canvas.height = h;
    const c = canvas.getContext('2d');
    const bg = c.createLinearGradient(0,0,w,h);
    bg.addColorStop(0,'#0d0628'); bg.addColorStop(0.5,'#10082e'); bg.addColorStop(1,'#080420');
    c.fillStyle = bg; c.fillRect(0,0,w,h);
    const glow = c.createRadialGradient(w/2,h/2,0,w/2,h/2,w*0.7);
    glow.addColorStop(0,'rgba(120,80,180,0.08)'); glow.addColorStop(0.5,'rgba(80,50,140,0.04)'); glow.addColorStop(1,'transparent');
    c.fillStyle = glow; c.fillRect(0,0,w,h);
    const goldDim = 'rgba(212,168,67,0.25)', goldFaint = 'rgba(212,168,67,0.12)';
    c.strokeStyle = goldDim; c.lineWidth = 1.5; rrect(c,4,4,w-8,h-8,6); c.stroke();
    c.strokeStyle = goldFaint; c.lineWidth = 0.8; rrect(c,9,9,w-18,h-18,4); c.stroke();
    [[16,16],[w-16,16],[16,h-16],[w-16,h-16]].forEach(([cx,cy])=>{
        c.save(); c.translate(cx,cy); c.rotate(Math.PI/4);
        c.strokeStyle=goldDim; c.lineWidth=0.8; c.strokeRect(-3.5,-3.5,7,7);
        c.fillStyle='rgba(212,168,67,0.15)'; c.fillRect(-2,-2,4,4); c.restore();
        c.strokeStyle='rgba(212,168,67,0.06)'; c.lineWidth=0.5;
        c.beginPath(); c.moveTo(cx,cy); c.lineTo(w/2,h/2); c.stroke();
    });
    const circR = Math.min(w,h)*0.26;
    c.strokeStyle=goldDim; c.lineWidth=1; c.beginPath(); c.arc(w/2,h/2,circR,0,Math.PI*2); c.stroke();
    c.strokeStyle='rgba(212,168,67,0.15)'; c.lineWidth=0.6; c.beginPath(); c.arc(w/2,h/2,circR*0.77,0,Math.PI*2); c.stroke();
    const cg = c.createRadialGradient(w/2,h/2,0,w/2,h/2,circR*0.46);
    cg.addColorStop(0,'rgba(212,168,67,0.12)'); cg.addColorStop(1,'rgba(212,168,67,0.02)');
    c.fillStyle=cg; c.beginPath(); c.arc(w/2,h/2,circR*0.46,0,Math.PI*2); c.fill();
    const starR = circR * 0.5;
    c.save(); c.translate(w/2,h/2);
    for(let i=0;i<8;i++){const a=(Math.PI*2*i)/8,oR=starR*(i%2===0?2.0:1.2);
        c.strokeStyle=i%2===0?'rgba(212,168,67,0.2)':'rgba(212,168,67,0.1)'; c.lineWidth=i%2===0?0.8:0.5;
        c.beginPath(); c.moveTo(Math.cos(a)*starR*0.5,Math.sin(a)*starR*0.5);
        c.lineTo(Math.cos(a)*oR,Math.sin(a)*oR); c.stroke();}
    c.fillStyle='rgba(212,168,67,0.3)'; c.strokeStyle=goldDim; c.lineWidth=0.8; c.beginPath();
    for(let i=0;i<16;i++){const a=(Math.PI*2*i)/16-Math.PI/2,r=i%2===0?starR:starR*0.4;
        c[i===0?'moveTo':'lineTo'](Math.cos(a)*r,Math.sin(a)*r);}
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle='rgba(240,214,138,0.7)'; c.beginPath(); c.arc(0,0,2,0,Math.PI*2); c.fill();
    c.restore();
    [28,h-28].forEach(yy=>{
        c.fillStyle='rgba(212,168,67,0.3)'; c.beginPath(); c.arc(w/2,yy,6,0,Math.PI*2); c.fill();
        c.save(); c.globalCompositeOperation='destination-out';
        c.beginPath(); c.arc(w/2+2.1,yy,5.1,0,Math.PI*2); c.fill(); c.restore();
        c.strokeStyle='rgba(212,168,67,0.2)'; c.lineWidth=0.5; c.beginPath(); c.arc(w/2,yy,6,0,Math.PI*2); c.stroke();
    });
    c.strokeStyle=goldFaint; c.lineWidth=0.5;
    [[0.2,38,0.38,38],[0.62,38,0.8,38],[0.2,h-38,0.38,h-38],[0.62,h-38,0.8,h-38]].forEach(([x1,y1,x2,y2])=>{
        c.beginPath(); c.moveTo(w*x1,y1); c.lineTo(w*x2,y2); c.stroke();});
    for(let i=0;i<12;i++){const a=(Math.PI*2*i)/12-Math.PI/2,dx=w/2+Math.cos(a)*circR,dy=h/2+Math.sin(a)*circR;
        c.save(); c.translate(dx,dy); c.rotate(a+Math.PI/2);
        c.fillStyle=i%3===0?'rgba(212,168,67,0.4)':'rgba(212,168,67,0.15)';
        const ds=i%3===0?2.5:1.5; c.beginPath(); c.moveTo(0,-ds); c.lineTo(ds*0.6,0); c.lineTo(0,ds); c.lineTo(-ds*0.6,0);
        c.closePath(); c.fill(); c.restore();}
    c.globalAlpha=0.015;
    for(let y=12;y<h-12;y+=4)for(let x=12;x<w-12;x+=4)if(Math.random()>0.85){c.fillStyle='#d4a843';c.fillRect(x,y,0.5,0.5);}
    c.globalAlpha=1;
}
function rrect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);
    c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);
    c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
const IMG_SOURCES = [
    './assets/cards/',
    './assets/cards/',
    './assets/cards/'
];
let bestSource = IMG_SOURCES[0];
let sourceScores = [0, 0, 0]; // 记录每个源的成功次数

function getCardImageUrl(cardId) {
    return bestSource + cardId + '.png';
}

// ===== 全局图片缓存系统 =====
var imgCache = {};
var imgLoading = {};

function loadCachedImg(cardId, callback) {
    if (imgCache[cardId]) {
        callback(imgCache[cardId]);
        return;
    }
    if (imgLoading[cardId]) {
        imgLoading[cardId].push(callback);
        return;
    }
    imgLoading[cardId] = [callback];
    var tryIdx = 0;
    var round = 0;
    var maxRounds = 2;
    var timeoutId = null;

    function onSuccess(src) {
        imgCache[cardId] = src;
        var queue = imgLoading[cardId] || [];
        delete imgLoading[cardId];
        queue.forEach(function(cb) { cb(src); });
        var sIdx = -1;
        for (var i = 0; i < IMG_SOURCES.length; i++) {
            if (src.indexOf(IMG_SOURCES[i]) === 0) { sIdx = i; break; }
        }
        if (sIdx >= 0) {
            sourceScores[sIdx]++;
            if (sourceScores[sIdx] > sourceScores[IMG_SOURCES.indexOf(bestSource)] + 2) {
                bestSource = IMG_SOURCES[sIdx];
            }
        }
    }

    function tryNext() {
        if (tryIdx >= IMG_SOURCES.length) {
            round++;
            if (round < maxRounds) {
                tryIdx = 0;
                setTimeout(tryNext, 1000 + round * 1000);
                return;
            }
            var queue = imgLoading[cardId] || [];
            delete imgLoading[cardId];
            queue.forEach(function(cb) { cb(''); });
            return;
        }
        var src = IMG_SOURCES[tryIdx] + cardId + '.png';
        var img = new Image();
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            img.onload = null;
            img.onerror = null;
            img.src = '';
            tryIdx++;
            tryNext();
        }, 4000);
        img.onload = function() {
            clearTimeout(timeoutId);
            onSuccess(src);
        };
        img.onerror = function() {
            clearTimeout(timeoutId);
            tryIdx++;
            tryNext();
        };
        img.src = src;
    }
    tryNext();
}

// 把缓存的图片填入容器
function fillCardImg(container, cardId) {
    container.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a0a2e;color:#d4a843;font-size:0.5rem;">加载中...</div>';
    loadCachedImg(cardId, function(src) {
        if (src) {
            container.innerHTML = '';
            var img = document.createElement('img');
            img.src = src;
            img.style.cssText = 'width:100%;height:100%;display:block;object-fit:cover;';
            container.appendChild(img);
        } else {
            container.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a0a2e;color:#d4a843;font-size:0.6rem;cursor:pointer;text-align:center;padding:4px;line-height:1.6;">点击<br>重试</div>';
            container.onclick = function() { container.onclick = null; fillCardImg(container, cardId); };
        }
    });
}


// 智能检测最快源（测试多张图，更准确）
(function detectFastestSource() {
    let resolved = false;
    const testCards = [0, 1, 10]; // 测试多张
    IMG_SOURCES.forEach((src, srcIdx) => {
        testCards.forEach(cardId => {
            const img = new Image();
            img.onload = () => {
                sourceScores[srcIdx]++;
                if (!resolved && sourceScores[srcIdx] >= 2) {
                    resolved = true;
                    bestSource = src;
                }
            };
            img.src = src + cardId + '.png';
        });
    });
    // 3秒后根据得分选最优源
    setTimeout(() => {
        if (!resolved) {
            let maxIdx = 0;
            sourceScores.forEach((s, i) => { if (s > sourceScores[maxIdx]) maxIdx = i; });
            if (sourceScores[maxIdx] > 0) bestSource = IMG_SOURCES[maxIdx];
        }
    }, 3000);
})();
// ============================================
// TAROT DATA
// ============================================

const majorArcana = [
{id:0,name:"愚者",en:"The Fool",upright:["新开始","自由","天真","冒险","无限可能"],reversed:["鲁莽","犹豫不决","冒险过度","轻率","恐惧未知"],uprightDesc:"愚者是塔罗中最自由的灵魂，编号为0，代表着无限的可能性与全新的开始。他怀抱着纯真的信念踏上旅途，不畏惧悬崖边的未知。此刻宇宙在邀请你放下过去的包袱，像孩子一般重新出发。",reversedDesc:"逆位的愚者警示你可能正在以不计后果的方式行事，或者因为过度恐惧而完全不敢迈出第一步。试着在勇敢和谨慎之间找到平衡。",love:"感情中可能出现令人兴奋的新邂逅或关系的新阶段。",work:"适合尝试新方向、新项目，不要被旧框架束缚。",advice:"保持开放的心态，信任直觉，但也留意脚下的路。",reversedLove:"过于冲动的感情决定可能让你受伤，先冷静下来再行动。",reversedWork:"不要盲目跳槽或冒进，缺乏准备的冒险只会适得其反。",reversedAdvice:"在勇气和鲁莽之间找到平衡，三思而后行。"},
{id:1,name:"魔术师",en:"The Magician",upright:["创造力","意志力","技能","自信","显化"],reversed:["操控","才能浪费","欺骗","缺乏行动力"],uprightDesc:"魔术师面前摆放着四大元素的工具，象征着你已经拥有了实现目标所需的一切资源。现在是将想法转化为现实的最佳时机。",reversedDesc:"逆位的魔术师暗示你可能没有充分利用自己的天赋和资源。审视你的真实意图，确保你的力量被用于正道。",love:"你有足够的魅力去吸引你想要的关系。",work:"展现你的专业能力，这是谈判和创业的好时机。",advice:"明确你的目标，集中所有资源去实现它。",reversedLove:"小心被花言巧语蒙蔽，看清对方的真实意图再交心。",reversedWork:"才华没有得到发挥，或有人在暗中操控局面，保持警惕。",reversedAdvice:"审视你的真实意图，不要用手段去达成目的。"},
{id:2,name:"女祭司",en:"The High Priestess",upright:["直觉","潜意识","神秘","内在智慧","耐心"],reversed:["忽视直觉","表面化","秘密被揭露","思维混乱"],uprightDesc:"女祭司邀请你向内探寻，倾听来自灵魂深处的声音。答案不在外面，而在你的内心。",reversedDesc:"逆位的女祭司提示你可能过于依赖理性分析而忽略了直觉的指引。",love:"关系中有未说出口的事情，倾听内心。",work:"不要急于做决定，等待合适的时机。",advice:"静下来，你的内在智慧比外部建议更可靠。",reversedLove:"感情中你忽略了自己真实的感受，过度迎合对方只会失去自我。",reversedWork:"过于依赖数据和理性，忽视了直觉给你的预警信号。",reversedAdvice:"不要再压抑你的内心感受，学会信任那些无法用逻辑解释的直觉。"},
{id:3,name:"皇后",en:"The Empress",upright:["丰饶","滋养","美丽","自然","母性","创造"],reversed:["过度依赖","创造力受阻","忽视自我","空虚"],uprightDesc:"皇后象征着无尽的丰饶与创造力。拥抱你的感性面，欣赏生活中的美。",reversedDesc:"逆位的皇后暗示你可能在付出和照顾他人的过程中忽略了自己的需求。",love:"感情充满温暖与甜蜜，关系在深化。",work:"创意项目会顺利推进。",advice:"善待自己的身体和心灵，在付出爱的同时也要学会接受爱。",reversedLove:"在感情中过度付出导致自我消耗，你需要先把爱给自己。",reversedWork:"创造力陷入瓶颈，可能是因为你太疲惫了，需要休息和充电。",reversedAdvice:"停止无底线地付出，学会对自己好一点，空杯子无法给别人倒水。"},
{id:4,name:"皇帝",en:"The Emperor",upright:["权威","结构","稳定","领导力","纪律"],reversed:["专制","僵化","控制欲","缺乏纪律"],uprightDesc:"皇帝代表建立稳固结构和清晰边界的时刻。通过纪律和规划来实现你的目标。",reversedDesc:"逆位的皇帝暗示权力的滥用或过度控制。",love:"关系需要明确的界限和承诺。",work:"领导力被认可，适合推动重要项目。",advice:"建立清晰的计划和边界，但也要学会灵活变通。",reversedLove:"控制欲正在毒害你的感情，伴侣需要的是陪伴而不是管控。",reversedWork:"管理方式过于僵硬，团队因此产生抵触情绪，学会倾听下属。",reversedAdvice:"权力和控制不能带来真正的安全感，学会放手和信任。"},
{id:5,name:"教皇",en:"The Hierophant",upright:["传统","指导","信仰","教育","精神导师"],reversed:["打破常规","质疑权威","个人信仰"],uprightDesc:"教皇代表着传统智慧的传承与精神指引。学习和灵性成长在此时特别重要。",reversedDesc:"逆位的教皇鼓励你质疑现有的规则，走出一条属于自己的道路。",love:"考虑关系中的长期承诺。",work:"遵循已有的流程，或寻找导师学习。",advice:"在传统与创新之间找到平衡点。",reversedLove:"不要被传统观念束缚你的感情选择，你有权走一条非传统的路。",reversedWork:"别盲目服从不合理的规则，有时打破常规才是正确的做法。",reversedAdvice:"质疑那些'应该'和'必须'，找到真正属于你自己的信仰和道路。"},
{id:6,name:"恋人",en:"The Lovers",upright:["爱情","和谐","选择","价值观统一","灵魂连接"],reversed:["不和谐","价值观冲突","错误选择"],uprightDesc:"恋人牌代表着深层的灵魂连接和发自内心的重要选择。跟随你的心。",reversedDesc:"逆位的恋人暗示关系中存在不和谐或面临艰难的选择。",love:"深刻的感情连接正在形成。",work:"选择与你价值观一致的伙伴和项目。",advice:"在做重大决定时，确保它反映了你最真实的价值观。",reversedLove:"价值观的分歧正在侵蚀你们的关系，需要认真谈一谈核心问题。",reversedWork:"合作方与你理念不合，勉强在一起只会两败俱伤。",reversedAdvice:"不要因为害怕孤独而做出违背内心的选择，错误的选择比没有选择更糟。"},
{id:7,name:"战车",en:"The Chariot",upright:["决心","胜利","行动力","意志力","突破"],reversed:["失去方向","失控","内在冲突"],uprightDesc:"战车象征着通过坚定的意志力驾驭对立的力量。保持方向感，胜利就在前方。",reversedDesc:"逆位的战车暗示你可能失去了方向感。停下来重新评估你的方向。",love:"在感情中需要主动出击。",work:"全力以赴推进你的项目。",advice:"驾驭你内在的对立力量，将它们转化为前进的动力。",reversedLove:"对感情过于急躁和强势，反而把对方越推越远。",reversedWork:"盲目地忙碌却没有方向，停下来想清楚再行动。",reversedAdvice:"失控不是因为力量不够，而是方向不对，先找回你的北极星。"},
{id:8,name:"力量",en:"Strength",upright:["内在力量","勇气","耐心","慈悲","温柔的力量"],reversed:["自我怀疑","脆弱","缺乏自信"],uprightDesc:"真正的力量不是压制和对抗，而是以温柔和慈悲面对生命中的野性力量。",reversedDesc:"逆位的力量暗示你正在经历自我怀疑或信心危机。",love:"用耐心和理解化解感情中的矛盾。",work:"面对困难保持镇定和耐心。",advice:"真正的力量是柔软的。善待自己的脆弱面。",reversedLove:"自卑感让你在感情中畏缩不前，你值得被爱，请相信这一点。",reversedWork:"面对挑战时信心不足，你比自己以为的更有能力，不要退缩。",reversedAdvice:"你现在的脆弱是暂时的，允许自己示弱，然后慢慢找回力量。"},
{id:9,name:"隐士",en:"The Hermit",upright:["内省","寻求真理","孤独","智慧","灵性指引"],reversed:["过度孤立","逃避现实","迷失"],uprightDesc:"隐士邀请你暂时远离喧嚣，进入深层的内省和静修。答案在你自己的内心深处。",reversedDesc:"逆位的隐士警告你可能过度封闭自己。是时候打开心门，重新与他人建立连接。",love:"如果单身，可能需要先了解自己才能遇到对的人。",work:"是时候深入研究和学习。",advice:"给自己安静独处的时间，但也要知道何时该走出洞穴。",reversedLove:"过度封闭自己只会错过真正的缘分，试着打开心门走出去。",reversedWork:"独自闷头苦干效率很低，你需要向外界寻求帮助和意见。",reversedAdvice:"孤独和独处不一样——你现在是在逃避而不是修行，走出来吧。"},
{id:10,name:"命运之轮",en:"Wheel of Fortune",upright:["命运","转折点","机遇","循环","好运"],reversed:["逆境","抗拒变化","坏运气"],uprightDesc:"命运的齿轮已经开始转动，变化是不可避免的。好运正在向你靠近。",reversedDesc:"逆位的命运之轮暗示你可能正在经历一段不顺利的时期。记住，低谷也是循环的一部分。",love:"感情可能迎来重大转变。",work:"机遇之窗正在打开。",advice:"拥抱变化，顺应命运的流动。",reversedLove:"感情遭遇逆风期，但请记住这只是暂时的，轮子还会转回来。",reversedWork:"工作上暂时运气不佳，不是你的能力问题，耐心等待转机。",reversedAdvice:"低谷是循环的一部分，不要在逆境中做重大决定，等待风向转变。"},
{id:11,name:"正义",en:"Justice",upright:["公正","真相","因果","平衡","法律"],reversed:["不公","逃避责任","偏见"],uprightDesc:"因果法则正在运作。过去的行为将结出果实。现在是做出公正决定的时候。",reversedDesc:"逆位的正义暗示某个不公平的情况正在发生。是时候面对真相。",love:"感情中需要公平对待彼此。",work:"合同和法律事务需要仔细审查。",advice:"以诚实和公正为准则行事。",reversedLove:"感情中存在不公平的付出，一方在牺牲另一方在索取，需要重新平衡。",reversedWork:"可能遇到不公正的对待，保留证据，必要时为自己争取权益。",reversedAdvice:"逃避责任只会让问题变得更大，勇敢面对后果才是解脱的开始。"},
{id:12,name:"倒吊人",en:"The Hanged Man",upright:["放手","新视角","暂停","接受","牺牲"],reversed:["拖延","拒绝放手","困顿"],uprightDesc:"通过放弃行动和控制，获得了全新的看世界的角度。有时候放手本身就是最大的收获。",reversedDesc:"逆位的倒吊人暗示你可能在拖延必要的决定。",love:"暂停对感情的执着追求，换个角度看。",work:"暂时的停滞是为了更好的出发。",advice:"有时候放手比紧握更需要勇气。",reversedLove:"你一直在等待对方改变，但拖延只会让感情继续消耗。",reversedWork:"该做的决定不能再拖了，拖延只会让局面越来越被动。",reversedAdvice:"你不是在等待时机，你是在逃避决定。该放的放，该断的断。"},
{id:13,name:"死神",en:"Death",upright:["转变","结束与新生","放下过去","深刻蜕变"],reversed:["抗拒改变","停滞不前","无法放手"],uprightDesc:"旧的篇章必须翻过，新的故事才能开始。结束往往伴随着悲伤，但这正是重生的前奏。",reversedDesc:"逆位的死神表示你正在强烈地抗拒一个必要的转变。鼓起勇气，让该结束的结束。",love:"一段关系可能发生根本性的改变。",work:"职业方向可能需要根本性的改变。",advice:"不要害怕结束，每一次死亡都是重生的序曲。",reversedLove:"你抓着一段已经死去的感情不放，放手才能遇到新的可能。",reversedWork:"留在一个没有未来的岗位上只是浪费时间，该转身的时候别犹豫。",reversedAdvice:"你害怕改变，但真正可怕的是什么都不变。放手吧，新生在等着你。"},
{id:14,name:"节制",en:"Temperance",upright:["平衡","和谐","耐心","中庸之道","疗愈"],reversed:["失衡","过度","缺乏耐心"],uprightDesc:"节制牌带来疗愈与和谐的能量，邀请你在生活的各个方面找到黄金平衡点。",reversedDesc:"逆位的节制暗示你的生活正处于某种失衡状态。",love:"感情需要双方的磨合与妥协。",work:"多个项目之间需要合理分配时间和精力。",advice:"耐心是一种美德。在对立之中寻找和谐。",reversedLove:"感情中的付出严重失衡，一方在过度牺牲，需要坦诚沟通。",reversedWork:"工作和生活失去平衡，身心健康正在亮红灯，必须调整节奏。",reversedAdvice:"你在某些方面过度了——可能是工作、可能是情绪。找回中间地带。"},
{id:15,name:"恶魔",en:"The Devil",upright:["束缚","执着","物质主义","阴暗面","上瘾"],reversed:["解脱","觉醒","打破束缚"],uprightDesc:"大多数束缚我们的东西都是自我施加的。意识到你被什么束缚是解脱的第一步。",reversedDesc:"逆位的恶魔意味着你正在觉醒，开始挣脱那些束缚你的锁链。",love:"审视关系中是否存在不健康的依赖。",work:"检查你是否被金钱或地位牢牢绑住。",advice:"勇敢面对你的阴暗面和恐惧。",reversedLove:"你终于看清了一段不健康的感情关系，挣脱的勇气正在觉醒。",reversedWork:"你正在从对金钱或地位的执念中解放出来，寻找真正有意义的事。",reversedAdvice:"觉醒已经开始，继续勇敢地剪断那些束缚你的锁链。"},
{id:16,name:"塔",en:"The Tower",upright:["突变","颠覆","觉醒","真相揭露"],reversed:["抗拒改变","延迟灾难","内在转变"],uprightDesc:"闪电是真相的力量，它摧毁虚假。在废墟中，你会找到真正属于你的东西。",reversedDesc:"逆位的塔暗示你可能在努力避免一场必要的颠覆。",love:"关系可能经历突然的变化或真相的揭露。",work:"工作环境可能发生剧烈变动。",advice:"让该崩塌的崩塌吧。真相虽然痛苦，但它会让你自由。",reversedLove:"你预感到感情中有问题却一直在回避，拖得越久崩塌越剧烈。",reversedWork:"你隐约知道现有的工作模式不可持续，但不敢面对改变。",reversedAdvice:"你在努力维持一座摇摇欲坠的塔，有时候主动拆除好过被动倒塌。"},
{id:17,name:"星星",en:"The Star",upright:["希望","灵感","平静","更新","信心","治愈"],reversed:["绝望","失去信心","灵感枯竭"],uprightDesc:"星星是黑暗后的曙光。希望正在重新点燃，灵感之泉正在流淌。",reversedDesc:"逆位的星星暗示你可能暂时失去了希望和方向感。不要放弃信念。",love:"治愈过去的情感伤痛，对爱保持希望。",work:"灵感回归，创意项目将获得突破。",advice:"保持希望，即使在最黑暗的夜晚，星星也在为你闪耀。",reversedLove:"过去的情伤让你不敢再相信爱情，但封闭的心无法接收新的温暖。",reversedWork:"灵感枯竭让你对工作失去热情，可能需要休息和换个环境。",reversedAdvice:"你暂时看不到星光，但它们一直都在。允许自己在黑暗中停留，光会回来的。"},
{id:18,name:"月亮",en:"The Moon",upright:["幻象","直觉","恐惧","潜意识","迷惑"],reversed:["看清真相","释放恐惧","迷雾消散"],uprightDesc:"月亮的光线会制造幻象和阴影。事情并不像表面看起来那样。信任你的直觉，但也要小心幻象。",reversedDesc:"逆位的月亮带来积极的信息——混乱和恐惧正在消散，你开始看清真相。",love:"感情中可能存在误解或不安全感。",work:"留意隐藏的信息。",advice:"在混沌中保持清醒，区分直觉和恐惧。",reversedLove:"之前看不清的感情真相正在变得清晰，误会有望解开。",reversedWork:"之前困扰你的迷雾正在散去，隐藏的信息即将浮出水面。",reversedAdvice:"恐惧正在消退，你开始看清事物的真实面目，继续保持清醒。"},
{id:19,name:"太阳",en:"The Sun",upright:["快乐","成功","活力","光明","丰盛"],reversed:["暂时受挫","过于乐观","延迟的快乐"],uprightDesc:"太阳带来成功、活力和纯粹的快乐。是时候庆祝生活、展现真实的自己了。",reversedDesc:"逆位的太阳仍然积极，只是快乐和成功可能会有些延迟。",love:"感情充满阳光和欢乐。",work:"事业迎来高光时刻。",advice:"释放你的热情和创造力，生活值得庆祝！",reversedLove:"感情中的快乐被一些乌云暂时遮挡，但阳光很快就会回来。",reversedWork:"成功会来但可能要再等等，不要因为延迟而灰心丧气。",reversedAdvice:"不要过于乐观地忽略潜在问题，先处理好隐患再庆祝。"},
{id:20,name:"审判",en:"Judgement",upright:["觉醒","重生","使命召唤","反思"],reversed:["自我批判","逃避使命","无法释怀"],uprightDesc:"灵魂的觉醒时刻。回顾过去是为了从每一段经历中提炼智慧。觉醒已经开始。",reversedDesc:"逆位的审判暗示你可能在逃避自我反省。释放过去的负罪感，给自己重新开始的机会。",love:"对过去的感情经历做出成熟的回顾。",work:"职业转型的重大时刻。",advice:"回顾过去但不要被它束缚，勇敢走向新生。",reversedLove:"你还在用过去的伤痛惩罚现在的自己和伴侣，是时候放下了。",reversedWork:"你听到了内心转变的召唤却不敢回应，逃避只会让你更痛苦。",reversedAdvice:"停止过度的自我批判，过去的错误已经发生，原谅自己才能重新开始。"},
{id:21,name:"世界",en:"The World",upright:["完成","圆满","成就","整合","新循环"],reversed:["未完成","缺乏结束感","延迟完成"],uprightDesc:"你已经走过了完整的一个生命循环，达成了一个重要的里程碑。庆祝你的成就吧！",reversedDesc:"逆位的世界暗示你可能在到达终点之前就停了下来。不要放弃，完成就在眼前。",love:"感情达到了美满的阶段。",work:"项目圆满完成，成就获得认可。",advice:"庆祝你的成就，然后以全新的姿态开始下一个冒险。",reversedLove:"感情总觉得差了点什么，可能是你还没有完全放下过去。",reversedWork:"项目接近尾声却迟迟无法收尾，最后一步最需要坚持。",reversedAdvice:"你离完成只差一步了，不要在终点线前停下来。"}
];
function genMinor(suit, suitCn, idStart, kw) {
    const ranks = ['王牌','二','三','四','五','六','七','八','九','十','侍从','骑士','王后','国王'];
    const ranksEn = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Page','Knight','Queen','King'];
    return ranks.map((r,i) => ({
        id: idStart+i, name: suitCn+r, en: ranksEn[i]+' of '+suit.charAt(0).toUpperCase()+suit.slice(1),
        upright: kw[i]?.up || ['积极','力量','成长'], reversed: kw[i]?.rev || ['阻碍','反思','调整'],
        uprightDesc: kw[i]?.upDesc || '这张牌带来了'+suitCn+'的能量，引导你在这个方向上前进。',
        reversedDesc: kw[i]?.revDesc || '逆位暗示在'+suitCn+'相关的领域需要更多关注和反思。',
        love: kw[i]?.love || '感情方面需要关注。', work: kw[i]?.work || '事业方面有新发展。',
        advice: kw[i]?.advice || '保持觉知，信任过程。',
        reversedLove: kw[i]?.revLove || '', reversedWork: kw[i]?.revWork || '',
        reversedAdvice: kw[i]?.revAdvice || ''
    }));
}

const wandsKw = [
{up:["新灵感","热情","创造力"],rev:["延迟","缺乏动力"],upDesc:"全新的创意火花正在点燃！",revDesc:"创造力暂时受到阻碍。",love:"热情的新邂逅。",work:"新项目灵感涌现。",advice:"抓住灵感的火花。",revLove:"对感情提不起热情，内心的火焰需要重新点燃。",revWork:"项目启动受阻，缺乏动力和方向。",revAdvice:"不要强求灵感，休息后再出发。"},
{up:["规划","远见","决策"],rev:["恐惧未知","犹豫不决"],upDesc:"现在是制定宏大计划的时刻。",revDesc:"对未知的恐惧正在阻碍你。",love:"需要对未来做出规划。",work:"制定长期战略。",advice:"抬头看看远方。",revLove:"对感情的未来感到迷茫，害怕做出承诺。",revWork:"缺乏远见导致决策犹豫，错失良机。",revAdvice:"恐惧不会因为你逃避就消失，面对它。"},
{up:["扩展","远见","进展顺利"],rev:["障碍","延迟"],upDesc:"你的努力正在开花结果。",revDesc:"计划遇到了延迟和阻碍。",love:"感情稳步发展。",work:"项目扩展有利。",advice:"保持耐心和远见。",revLove:"感情发展遇到瓶颈，不要急躁，给彼此时间。",revWork:"项目进展缓慢，可能需要调整策略。",revAdvice:"延迟不是失败，调整方向后继续前行。"},
{up:["庆祝","和谐","里程碑"],rev:["缺乏根基","不安"],upDesc:"一个重要的里程碑已经达成！",revDesc:"你可能内心缺乏安全感。",love:"关系中的里程碑时刻。",work:"项目阶段性成功。",advice:"停下来庆祝你的成就。",revLove:"表面甜蜜但内心不安，你们的根基是否真的稳固？",revWork:"成就感来得快去得也快，根基不够扎实。",revAdvice:"在庆祝之前，先确保你的基础足够牢固。"},
{up:["竞争","冲突","成长"],rev:["回避冲突","内心挣扎"],upDesc:"建设性的竞争和碰撞推动你成长。",revDesc:"你可能在回避必要的冲突。",love:"小争吵可能是必要的。",work:"竞争激烈但是好机会。",advice:"不要害怕冲突和竞争。",revLove:"逃避争吵不代表没有问题，压抑的矛盾终会爆发。",revWork:"团队内部暗流涌动，回避只会让问题恶化。",revAdvice:"面对冲突比逃避冲突需要更大的勇气，但也更值得。"},
{up:["胜利","荣誉","认可"],rev:["失败感","自大"],upDesc:"你的努力终于获得了认可！",revDesc:"你的付出没有得到认可。",love:"感到被欣赏和珍视。",work:"获得晋升或嘉奖。",advice:"享受成就，保持谦逊。",revLove:"在感情中感到不被重视，需要表达你的需求。",revWork:"努力没有被看见，可能需要换一种方式展示你的价值。",revAdvice:"外界的认可固然重要，但不要因为没有掌声就否定自己。"},
{up:["坚守","防御","毅力"],rev:["退缩","不堪重负"],upDesc:"坚守你的立场和信念。",revDesc:"压力太大让你想要退缩。",love:"为你的底线站出来。",work:"坚守专业立场。",advice:"坚持下去，胜利属于不放弃的人。",revLove:"在感情中承受了太多压力，你有权利说够了。",revWork:"工作压力已经超过了你的承受极限，寻求支援。",revAdvice:"坚持是美德，但识时务也是智慧，不要硬撑到崩溃。"},
{up:["快速进展","消息","行动"],rev:["延迟","受阻","混乱"],upDesc:"一切都在快速推进！好消息即将到来。",revDesc:"你期待的进展遇到了延迟。",love:"感情发展迅速。",work:"项目快速推进。",advice:"一切都在加速，跟上节奏！",revLove:"感情进展突然停滞，不要焦虑，耐心等待。",revWork:"项目被各种意外打乱节奏，需要重新规划时间。",revAdvice:"越急越乱，先让自己冷静下来再处理事情。"},
{up:["坚韧","最后考验","勇气"],rev:["精疲力竭","放弃"],upDesc:"最后一道考验——再坚持一下。",revDesc:"你已经精疲力竭。",love:"感情经历考验但还在坚持。",work:"最困难的阶段，咬牙坚持。",advice:"不要在黎明前放弃。",revLove:"你在感情中已经身心俱疲，也许放手比硬撑更好。",revWork:"过度的工作压力正在损害你的健康，学会及时休息。",revAdvice:"精疲力竭不是软弱的表现，你已经很努力了，允许自己休息。"},
{up:["重担","责任","压力"],rev:["放下负担","学会委派"],upDesc:"你不必一个人扛下所有。",revDesc:"你正在学会放下不必要的重担。",love:"需要与伴侣平等分担。",work:"学会说不和分配任务。",advice:"轻装才能走得更远。",revLove:"你终于意识到不需要独自承担感情中所有的问题。",revWork:"开始学会委派任务和拒绝不合理的要求，这是进步。",revAdvice:"放下不是放弃，而是智慧地选择该背负什么。"},
{up:["探索","热忱","好消息"],rev:["缺乏方向","三分钟热度"],upDesc:"新的灵感和好消息即将到来。",revDesc:"热情来得快去得也快。",love:"令人心动的新邂逅。",work:"好消息即将传来。",advice:"保持好奇心和探索精神。",revLove:"对感情缺乏持久的热情，问问自己到底想要什么。",revWork:"对新工作的兴趣很快消退，需要找到持久的动力。",revAdvice:"不要什么都想尝试，找到一个方向深入下去。"},
{up:["冒险","激情","行动力"],rev:["冲动","鲁莽"],upDesc:"充满不可阻挡的热情和行动力。",revDesc:"冲动可能给你带来麻烦。",love:"火热而充满激情的恋情。",work:"大胆推进项目。",advice:"热情是武器，但要学会引导它。",revLove:"感情中过于冲动和急躁，可能因为莽撞而伤害到对方。",revWork:"不加思考的行动反而帮了倒忙，先规划再行动。",revAdvice:"冲劲十足但方向混乱，先冷静再出发。"},
{up:["自信","独立","温暖"],rev:["嫉妒","控制欲"],upDesc:"散发着温暖而强大的能量。",revDesc:"不安全感可能让你变得控制欲强。",love:"保持独立和自信。",work:"领导力和社交能力是核心竞争力。",advice:"像太阳一样发光发热。",revLove:"嫉妒心和控制欲正在毒害你的感情，给对方自由。",revWork:"对团队管控过度，信任你的同事。",revAdvice:"不安全感不会因为控制别人而消失，安全感来自内心。"},
{up:["远见","领袖气质","大胆"],rev:["专横","不切实际"],upDesc:"天生的领袖和远见者。",revDesc:"领导方式可能过于专横。",love:"成为充满激情的伴侣。",work:"展现你的领导力。",advice:"用愿景激励他人。",revLove:"对感情的期待过于理想化，现实中的伴侣不是你想象的剧本。",revWork:"领导方式令人窒息，需要更多倾听和包容。",revAdvice:"远大的目标需要脚踏实地的执行，别只画饼不做事。"}
];

const cupsKw = [
{up:["新感情","爱","喜悦"],rev:["情感压抑","空虚"],upDesc:"最纯粹的爱与情感能量涌入你的生活。",revDesc:"你可能在压抑自己的情感需求。",love:"新恋情或感情升华。",work:"对工作重新燃起热情。",advice:"打开你的心，允许爱自由地流动。",revLove:"你把真实的情感深深藏起来，对方感受不到你的心。",revWork:"对工作失去了情感投入，只是在机械地完成任务。",revAdvice:"不要再压抑你的感受了，允许自己去感受和表达。"},
{up:["伙伴","联结","吸引"],rev:["分离","失衡"],upDesc:"深层的灵魂联结，平等、尊重、互相欣赏。",revDesc:"关系中的平衡被打破了。",love:"灵魂伴侣连接。",work:"理想的合作伙伴。",advice:"真正的连接建立在平等和尊重之上。",revLove:"关系中的付出和回报严重不对等，需要重新谈判。",revWork:"合作关系出现裂痕，双方目标开始分化。",revAdvice:"失衡的关系无法持久，勇敢提出你的需求。"},
{up:["庆祝","友谊","欢乐"],rev:["过度放纵","社交疲劳"],upDesc:"友谊和共同欢庆的美好时刻。",revDesc:"社交让你疲惫。",love:"朋友间可能产生恋情。",work:"团队合作成果喜人。",advice:"珍惜你的友谊。",revLove:"社交圈的热闹掩盖不了内心的孤独，你需要真正的深度连接。",revWork:"团队过于松散，聚会多但实际产出少。",revAdvice:"比起热闹的社交，你现在更需要独处和充电。"},
{up:["不满足","冥想","倦怠"],rev:["觉醒","接受新机遇"],upDesc:"一个新的机会正在被你忽视。",revDesc:"你开始从倦怠中醒来。",love:"可能对现有关系感到麻木。",work:"新机会就在眼前。",advice:"看看宇宙正在递给你什么。",revLove:"你终于愿意正视感情中的问题，改变正在开始。",revWork:"你开始重新审视被你忽视的机会，觉醒来得正是时候。",revAdvice:"从麻木中醒来的第一步已经迈出，继续向前。"},
{up:["失落","悲伤","遗憾"],rev:["释怀","向前看"],upDesc:"你正在为失去的东西悲伤，但身后还有完好的杯子。",revDesc:"你正在从悲伤中恢复。",love:"可能正在经历失恋的痛苦。",work:"项目失败需要消化。",advice:"转身看看，你还拥有很多。",revLove:"失恋的伤痛正在慢慢愈合，你开始准备好迎接新的感情。",revWork:"从失败中汲取教训，准备重新出发。",revAdvice:"最难过的时期已经过去了，允许自己慢慢走出来。"},
{up:["怀旧","童年","纯真"],rev:["活在过去","无法长大"],upDesc:"温暖的怀旧气息和甜蜜回忆。",revDesc:"过于沉溺于过去的美好。",love:"旧情人可能重新出现。",work:"可能与旧同事合作。",advice:"在当下创造新的美好。",revLove:"你一直在拿过去的恋情和现在比较，这不公平。",revWork:"怀念过去的工作环境无济于事，适应当下才是关键。",revAdvice:"过去的美好不会重来，把目光放到当下和未来。"},
{up:["幻想","选择","诱惑"],rev:["回归现实","做出抉择"],upDesc:"面对众多可能性，分辨哪些是真实的机遇。",revDesc:"你开始从幻想中醒来。",love:"分辨真感情和一时迷恋。",work:"需要聚焦。",advice:"选择一个真实可行的目标。",revLove:"你终于看清了哪些是真爱哪些只是幻想，做出选择吧。",revWork:"不再被各种诱人但不切实际的想法分心，开始聚焦。",revAdvice:"从白日梦中醒来是好事，现实虽不如幻想美好但更真实。"},
{up:["离开","寻找意义"],rev:["逃避","害怕改变"],upDesc:"最勇敢的事情就是离开看似完好的现状。",revDesc:"你知道应该离开但无法迈步。",love:"关系无法满足深层需求。",work:"寻找更有意义的方向。",advice:"勇敢地去寻找真正滋养灵魂的东西。",revLove:"你知道这段感情不对，却因为害怕孤独而不敢离开。",revWork:"不满意现状却不敢跳出舒适区，恐惧在束缚着你。",revAdvice:"逃避改变比改变本身更痛苦，鼓起勇气迈出那一步。"},
{up:["愿望成真","满足","幸福"],rev:["不满足","贪心"],upDesc:"你的愿望即将成真！享受这份幸福。",revDesc:"内心仍然不满足。真正的幸福来自感恩。",love:"感到极大的满足和幸福。",work:"目标达成，成就感满满。",advice:"真正的满足来自于感恩你所拥有的。",revLove:"拥有了却还是不快乐，你真正需要的到底是什么？",revWork:"目标达成后发现并不如预期那么满足，重新审视什么才重要。",revAdvice:"贪心会让你永远无法满足，学会感恩此刻拥有的一切。"},
{up:["圆满幸福","家庭和谐"],rev:["家庭不和","理想破灭"],upDesc:"情感上的最高圆满——持久的爱和和谐的家庭。",revDesc:"家庭表面和谐但内里有裂痕。",love:"深层的家庭幸福。",work:"找到有意义且满足的事业。",advice:"珍惜眼前的每一份温暖和爱。",revLove:"家庭中的裂痕不会自己愈合，需要每个人都用心修补。",revWork:"工作带来的成就感无法弥补家庭关系的缺失。",revAdvice:"完美的家庭不存在，但真诚的努力可以让它变得更好。"},
{up:["直觉","创意","浪漫消息"],rev:["情感不成熟","幻想过多"],upDesc:"生活中出现了意想不到的灵感和惊喜。",revDesc:"过度沉浸在幻想中。",love:"可能收到浪漫的表白。",work:"创意灵感涌现。",advice:"保持童心和好奇。",revLove:"不要把爱情理想化，眼前的人有优点也有缺点。",revWork:"想法很多但都停留在空想阶段，需要脚踏实地。",revAdvice:"做梦是好的，但也需要睁开眼睛面对现实。"},
{up:["浪漫","魅力","理想主义"],rev:["不切实际","情绪化"],upDesc:"浪漫与理想主义的化身。一个浪漫的机遇即将到来。",revDesc:"过于理想主义可能导致失望。",love:"浪漫的追求者出现。",work:"追求充满热情的工作。",advice:"追随你的心，但也要让理性指引方向。",revLove:"过于情绪化让你在感情中起伏不定，需要更多稳定。",revWork:"对工作抱有不切实际的期待，结果只会失望。",revAdvice:"浪漫主义是你的天赋，但需要现实的根基来支撑。"},
{up:["共情","温柔","直觉力"],rev:["情绪不稳","过度敏感"],upDesc:"情感智慧和直觉力的化身——深深感受着一切。",revDesc:"你可能被自己的情绪淹没了。",love:"用理解和共情滋养关系。",work:"利用情商做出明智判断。",advice:"你的共情力是天赋，但也把温柔留给自己。",revLove:"过度敏感让你在感情中草木皆兵，小事也能引发情绪风暴。",revWork:"情绪波动影响了工作表现，需要学会情绪管理。",revAdvice:"你感受到的不一定都是真的，有时候是情绪在放大信号。"},
{up:["情感成熟","平衡","智慧"],rev:["情感压抑","操控"],upDesc:"精通情感的艺术——既有深邃的感受力，又能驾驭情绪。",revDesc:"你可能在压抑真实情感。",love:"以成熟和智慧经营感情。",work:"用情商领导团队。",advice:"掌握情绪不是压制，而是智慧引导。",revLove:"你用理智压制了真实的情感，看似冷静实则在积累问题。",revWork:"对团队的情感操控终会被看穿，真诚才是长久之道。",revAdvice:"压抑情绪不等于处理情绪，找到安全的方式让它们流出来。"}
];

const swordsKw = [
{up:["清晰","突破","真相"],rev:["混乱","误导"],upDesc:"智慧和真相的终极力量。你的思维正在经历突破。",revDesc:"思路混乱不清。",love:"需要坦诚的沟通。",work:"新的想法和战略突破。",advice:"用清晰的思维切割掉一切幻象。",revLove:"沟通中的误解越来越深，你们需要冷静下来好好谈谈。",revWork:"思路混乱导致方向错误，先理清想法再行动。",revAdvice:"现在不是做重要决定的时候，等头脑清醒了再说。"},
{up:["僵局","两难","内心矛盾"],rev:["做出决定","打破僵局"],upDesc:"你面临一个艰难的抉择，但逃避不是办法。",revDesc:"你终于准备好面对那个决定了。",love:"犹豫不决需要面对。",work:"重要的抉择不能再拖延。",advice:"逃避选择本身也是一种选择。",revLove:"你终于准备好做出感情上的决定了，相信自己。",revWork:"僵局终于被打破，虽然过程艰难但结果会好起来。",revAdvice:"做出了决定就不要回头，向前看。"},
{up:["心碎","悲伤","背叛"],rev:["从伤痛恢复","释放悲伤"],upDesc:"这是最直白的心碎象征。允许自己去感受。",revDesc:"最痛苦的时期正在过去。",love:"可能经历情感上的重大创伤。",work:"接到令人失望的消息。",advice:"允许自己去悲伤，暴风雨终会过去。",revLove:"心碎的伤口正在慢慢愈合，你变得更坚强了。",revWork:"从打击中恢复，用经验教训武装自己。",revAdvice:"最痛苦的部分已经过去了，让伤口结痂，不要反复揭开。"},
{up:["休息","恢复","冥想"],rev:["不安","无法休息"],upDesc:"这是神圣的休息时间——积蓄力量。",revDesc:"你急需休息却停不下来。",love:"给感情一些喘息的空间。",work:"身心健康比截止日期更重要。",advice:"战士也需要休息。",revLove:"你们都太疲惫了，给彼此独处的时间反而有益。",revWork:"身体在发出警告了，再不休息就要强制停机了。",revAdvice:"忙碌不等于有价值，你现在最需要做的事就是什么都不做。"},
{up:["冲突","得不偿失"],rev:["和解","反思"],upDesc:"他赢了这场争斗——但赢得了什么？",revDesc:"你开始意识到争斗的代价太高了。",love:"争吵赢了道理却输了感情。",work:"办公室政治得不偿失。",advice:"有些战斗不值得打。",revLove:"你开始意识到争对错没有意义，选择和解是更大的勇气。",revWork:"职场纷争正在降温，是时候放下对立寻求合作。",revAdvice:"赢了面子输了里子，这种胜利毫无意义。"},
{up:["过渡","前进","好转"],rev:["困在过去","抗拒转变"],upDesc:"你正在从困难中转移向更平静的水域。",revDesc:"你发现很难离开当前的困境。",love:"从不健康的关系中走出。",work:"职业转换正在进行。",advice:"前进的路可能不舒适，但回头更痛苦。",revLove:"明知道应该走出来却不断回头，你在折磨自己。",revWork:"一直犹豫要不要换工作，在犹豫中浪费了更多时间。",revAdvice:"你被困住不是因为走不了，而是因为你不愿意走。"},
{up:["策略","隐秘","机智"],rev:["坦诚","秘密曝光"],upDesc:"需要运用策略和智慧来应对局面。",revDesc:"秘密即将被揭露。",love:"关系中可能存在不坦诚。",work:"留意隐藏的议程。",advice:"智慧和策略是工具，但不要跨越欺骗的界线。",revLove:"隐瞒的事情即将曝光，与其被揭穿不如主动坦白。",revWork:"办公室里的秘密计划被发现了，坦诚面对后果。",revAdvice:"秘密是定时炸弹，越早拆除越安全。"},
{up:["困境","自我束缚","盲点"],rev:["解放","突破限制"],upDesc:"大多数困住你的东西都是头脑中的限制。",revDesc:"你开始意识到束缚你的是自己的思维。",love:"不要让恐惧困住你的感情。",work:"选择比你想象的多。",advice:"你的牢笼没有锁——改变想法就能走出来。",revLove:"你正在挣脱自我设限，开始相信自己值得被爱。",revWork:"思维枷锁正在松动，你开始看到更多的可能性。",revAdvice:"觉醒已经开始，继续拆除那些你自己建造的高墙。"},
{up:["焦虑","失眠","过度忧虑"],rev:["释放焦虑","最坏的已过去"],upDesc:"你可能被恐惧和忧虑折磨得夜不能寐。",revDesc:"最黑暗的夜即将过去。",love:"对感情的过度忧虑在折磨你。",work:"工作压力导致焦虑。",advice:"你的恐惧比现实本身更可怕。",revLove:"对感情的焦虑正在缓解，事情没有你想象的那么糟。",revWork:"工作上最让你焦虑的事情正在过去。",revAdvice:"天亮了，那些在深夜折磨你的恐惧正在消散。"},
{up:["终结","最低谷","结束"],rev:["触底反弹","重生"],upDesc:"你已经到了最低谷，从现在开始，只有向上的路。",revDesc:"你正在从最低点重新站起来。",love:"一段感情可能走到了尽头。",work:"项目终结，但塞翁失马焉知非福。",advice:"当你跌到谷底，唯一的方向就是向上。",revLove:"从感情最黑暗的时期走出来了，新的开始就在前方。",revWork:"最糟糕的时期已经过去，事情开始向好的方向发展。",revAdvice:"你已经从谷底开始往上爬了，每一步都在变好。"},
{up:["好奇心","敏锐","新想法"],rev:["八卦","粗心"],upDesc:"思维敏捷，充满好奇心。",revDesc:"注意言辞可能伤害到他人。",love:"沟通中注意措辞。",work:"适合学习新技能。",advice:"好奇心和敏锐是天赋，用在正确的地方。",revLove:"说话不经大脑可能伤到对方，管好你的嘴。",revWork:"八卦和不谨慎的言论可能给你带来麻烦。",revAdvice:"言语是有力量的，用它来建设而不是破坏。"},
{up:["迅速行动","果断","雄心"],rev:["冲动","鲁莽"],upDesc:"势如破竹，现在是果断行动的时刻。",revDesc:"鲁莽和冲动可能让你陷入麻烦。",love:"直接表达感受，但别太尖锐。",work:"快速推进项目。",advice:"果断是美德，但确保方向正确。",revLove:"话说得太快太狠，已经伤到对方了，先道歉。",revWork:"急于求成反而出了大错，先停下来想清楚。",revAdvice:"速度不等于效率，方向错了跑得越快偏得越远。"},
{up:["清晰","独立","直率"],rev:["冷漠","尖刻"],upDesc:"经历过痛苦但变得更加清醒和坚强。",revDesc:"你可能变得过于冷漠。",love:"保持独立和清醒，但也别忘了打开心门。",work:"用敏锐的分析力做判断。",advice:"坚强不等于冷漠，清醒不等于无情。",revLove:"你用冷漠来保护自己，但也把真心爱你的人挡在了门外。",revWork:"过于尖锐的批评伤害了同事关系，需要多一点温度。",revAdvice:"经历过伤痛不代表要封闭自己，试着重新学会柔软。"},
{up:["理性","权威","公正"],rev:["独裁","冷酷"],upDesc:"最高的理性和公正——以逻辑和智慧做出决策。",revDesc:"过于冷酷理性可能伤害他人。",love:"需要更多的温情。",work:"以公正和智慧领导团队。",advice:"智慧不仅是头脑的，也是心灵的。",revLove:"你用理性碾压了感情中的温柔，伴侣需要的是爱不是道理。",revWork:"领导方式太冷酷，团队需要的是指引而不是审判。",revAdvice:"真正的智者不仅有清醒的头脑，还有温暖的心。"}
];

const pentaclesKw = [
{up:["新机遇","繁荣","好的开始"],rev:["错失良机","财务损失"],upDesc:"物质世界的丰盛之门为你打开。",revDesc:"一个好的机会可能溜走了。",love:"关系建立在稳固基础之上。",work:"新的财务机遇出现。",advice:"脚踏实地地把握机遇。",revLove:"因为犹豫不决错过了一段好感情。",revWork:"好机会从手中溜走了，下次果断一点。",revAdvice:"不要再犹豫了，机遇不会一直等你。"},
{up:["平衡","灵活应变","适应"],rev:["失衡","不堪重负"],upDesc:"生活需要你在多个领域间保持灵活平衡。",revDesc:"太多事情同时发生让你应接不暇。",love:"寻找感情和生活的平衡。",work:"多项目并行需要时间管理。",advice:"灵活、专注、保持节奏。",revLove:"工作和感情严重失衡，你必须做出取舍。",revWork:"同时处理太多事导致每件都做不好。",revAdvice:"你不是超人，学会优先级排序。"},
{up:["合作","团队","精益求精"],rev:["各自为政","质量下降"],upDesc:"团队合作和精益求精是成功的关键。",revDesc:"团队缺乏协调。",love:"关系中需要共同努力。",work:"团队协作是关键。",advice:"借助团队的力量精益求精。",revLove:"你们各过各的生活，已经不像是伴侣了。",revWork:"团队协作出了问题，大家都在单打独斗。",revAdvice:"如果不能齐心协力，再好的计划也无法执行。"},
{up:["安全感","保守","稳定"],rev:["放手","慷慨"],upDesc:"适度的安全感好，但过度执着会阻碍流动。",revDesc:"你正在学会放松对物质的紧握。",love:"控制欲会推开对方。",work:"财务稳健但别过度保守。",advice:"握紧拳头你什么都抓不住。",revLove:"你开始学会在感情中放松控制，这是好事。",revWork:"开始愿意投资和冒一点风险了，进步。",revAdvice:"适度地松开手，你会发现流动带来更多。"},
{up:["困难","贫困","孤立"],rev:["走出困境","获得帮助"],upDesc:"你可能正在经历困难时期，但帮助就在身边。",revDesc:"困难时期正在过去。",love:"感到被忽视或孤立。",work:"财务困难需要正视。",advice:"不要独自硬扛——帮助就在身边。",revLove:"孤立的感觉正在消退，有人在关心你。",revWork:"财务困境出现了转机，最艰难的时期过去了。",revAdvice:"你已经开始走出低谷了，继续寻求帮助和支持。"},
{up:["慷慨","施与受","公平"],rev:["贪婪","施恩图报"],upDesc:"给予和接受的平衡——慷慨地分享。",revDesc:"给予时附加了条件。",love:"慷慨地付出爱。",work:"分享资源和知识。",advice:"真正的慷慨不求回报。",revLove:"你的付出带着条件和期待，这不是真正的爱。",revWork:"分享资源时总是想着回报，功利心太重了。",revAdvice:"带着条件的慷慨不是慷慨，检视你给予的真实动机。"},
{up:["耐心","评估成果","长期投资"],rev:["急于求成","回报不足"],upDesc:"你的长期努力正在慢慢结出果实。",revDesc:"你对投入的回报感到失望。",love:"感情需要时间培养。",work:"长期投资需要耐心。",advice:"耐心等待收获的季节。",revLove:"急于看到感情结果反而给了对方压力。",revWork:"投入了很多却看不到回报，可能需要调整策略。",revAdvice:"如果回报迟迟不来，也许需要重新评估你的方向。"},
{up:["勤奋","技艺精进","专注"],rev:["敷衍了事","缺乏热情"],upDesc:"通过持续练习，你的技能正在日益精进。",revDesc:"你可能对工作失去了热情。",love:"用心经营感情的细节。",work:"技能提升期，学习有显著回报。",advice:"大师不是天生的——保持专注和谦虚。",revLove:"感情经营开始敷衍，细节中的爱在消失。",revWork:"对工作失去热情，只是在应付了事。",revAdvice:"重新找到让你热血沸腾的事情，否则一切只是消磨时间。"},
{up:["丰收","独立","优雅"],rev:["过度依赖","虚荣"],upDesc:"你的独立和辛勤工作正在开花结果。",revDesc:"过度追求物质的外在表现。",love:"独立自主更具吸引力。",work:"专业能力带来丰厚回报。",advice:"真正的富足是你凭自己的力量创造的。",revLove:"用物质来弥补感情的空虚，这条路走不通。",revWork:"过于在意外在形象而忽视了真实的能力。",revAdvice:"真正的价值不在于你拥有什么，而在于你是什么样的人。"},
{up:["财富传承","家族","长久稳定"],rev:["家庭纷争","根基不稳"],upDesc:"物质和精神的双重传承。",revDesc:"家庭中可能存在争议。",love:"深厚的家庭纽带。",work:"建立持久传承的事业。",advice:"你建立的一切将惠及后来者。",revLove:"家庭矛盾影响了你们的感情，需要一起面对。",revWork:"事业的根基出现了动摇，需要回归基本面。",revAdvice:"传承不只是物质的，更重要的是价值观和爱。"},
{up:["学习","新技能","务实"],rev:["缺乏进展","懒散"],upDesc:"脚踏实地、目标明确地追求新技能。",revDesc:"学习缺乏恒心。",love:"稳步经营务实的感情。",work:"适合学习新技能。",advice:"千里之行始于足下。",revLove:"对感情缺乏经营的耐心，好感情不会从天上掉下来。",revWork:"学习三天打鱼两天晒网，这样永远不会有进步。",revAdvice:"别再找借口了，现在就开始行动。"},
{up:["勤劳","可靠","脚踏实地"],rev:["固执","效率低下"],upDesc:"不是最快但一定是最可靠的。稳扎稳打永远胜过急功近利。",revDesc:"你可能陷入了固执或懈怠。",love:"稳定可靠的感情。",work:"以务实的态度稳步推进。",advice:"稳定的乌龟总能赢得赛跑。",revLove:"感情陷入了一成不变的模式，需要注入新鲜感。",revWork:"过于固执地坚持低效的方法，需要变通。",revAdvice:"勤劳是好的，但方向不对再努力也白费。"},
{up:["务实","滋养","富足"],rev:["过度操劳","忽视自我"],upDesc:"完美平衡了物质成就和生活品质。",revDesc:"在照顾他人过程中忽视了自己。",love:"创造温暖舒适的家。",work:"高效务实地管理资源。",advice:"最好的照顾是首先照顾好自己。",revLove:"你为家庭付出太多却忘了自己，这样下去会崩溃的。",revWork:"过度操劳身体在报警了，再忙也要照顾自己。",revAdvice:"你不是取之不尽的泉水，枯竭之前先给自己充电。"},
{up:["财富","成功","商业头脑"],rev:["贪婪","守财奴"],upDesc:"物质世界的绝对掌控者。多年智慧和勤奋带来了财富和地位。",revDesc:"对金钱的过度追求让你失去了更重要的东西。",love:"提供安全稳定的感情环境。",work:"商业直觉和管理能力在巅峰。",advice:"真正的富有是你能自由选择用时间做什么。",revLove:"你用金钱代替了陪伴，伴侣要的不是你的钱而是你的心。",revWork:"对利润的过度追求让你失去了初心和人心。",revAdvice:"钱买不到的东西才是最珍贵的，别等失去了才明白。"}
];

const wands = genMinor('wands','权杖',22,wandsKw);
const cups = genMinor('cups','圣杯',36,cupsKw);
const swords = genMinor('swords','宝剑',50,swordsKw);
const pentacles = genMinor('pentacles','星币',64,pentaclesKw);
const allCards = [...majorArcana,...wands,...cups,...swords,...pentacles];
// ===== SPREAD DEFINITIONS =====
const spreads = {
    single:{name:"每日一卡",count:1,meanings:["今日指引"],layout:"single"},
    three:{name:"时间之流",count:3,meanings:["过去","现在","未来"],layout:"three"},
    cross:{name:"十字牌阵",count:5,meanings:["当前处境","面临挑战","潜意识根源","建议行动","可能结果"],layout:"cross"},
    relationship:{name:"关系牌阵",count:5,meanings:["你的状态","对方状态","关系现状","核心挑战","未来发展"],layout:"relationship"},
    hexagram:{name:"六芒星阵",count:7,meanings:["过去","近期未来","潜意识","意识层面","更高指引","近期影响","最终结果"],layout:"hexagram"},
    celtic:{name:"凯尔特十字",count:10,meanings:["现状核心","直接挑战","潜意识基础","近期过去","最高理想","近期未来","你的态度","外在环境","希望与恐惧","最终结果"],layout:"celtic"}
};

// ===== STATE =====
let deckType='major',currentSpread=null,deck=[],drawn=[],shuffled=false,drawIdx=0;
let soundOn=false,audioCtx=null,bgOscillators=[];

// ===== NAVIGATION =====
function showHome(){
    document.getElementById('homePage').classList.remove('hidden');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
}
function showHistory(){
    document.getElementById('homePage').classList.add('hidden');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('historyPage').classList.add('active');
    renderHistory();
}
function setDeck(type){
    deckType=type;
    document.getElementById('deckMajor').classList.toggle('active',type==='major');
    document.getElementById('deckFull').classList.toggle('active',type==='full');
}

// ===== SOUND ENGINE =====
function initAudio(){if(audioCtx)return;audioCtx=new(window.AudioContext||window.webkitAudioContext)();}
function startAmbientSound(){
    initAudio();if(bgOscillators.length>0)return;
    const mg=audioCtx.createGain();mg.gain.value=0.06;mg.connect(audioCtx.destination);
    [110,146.83,164.81,220].forEach((f,i)=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain(),fl=audioCtx.createBiquadFilter();
        o.type='sine';o.frequency.value=f;fl.type='lowpass';fl.frequency.value=400;fl.Q.value=1;
        g.gain.value=0;g.gain.linearRampToValueAtTime(0.15,audioCtx.currentTime+3+i);
        o.connect(fl);fl.connect(g);g.connect(mg);o.start();bgOscillators.push({osc:o,gain:g,filter:fl});
    });
    const lfo=audioCtx.createOscillator(),lg=audioCtx.createGain();
    lfo.type='sine';lfo.frequency.value=0.08;lg.gain.value=15;lfo.connect(lg);
    bgOscillators.forEach(o=>{if(o.filter)lg.connect(o.filter.frequency)});lfo.start();
    bgOscillators.push({osc:lfo,gain:lg});
    [329.63,440,523.25].forEach((f,i)=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=0;
        function cy(){const n=audioCtx.currentTime;g.gain.cancelScheduledValues(n);g.gain.setValueAtTime(0,n);
            g.gain.linearRampToValueAtTime(0.03,n+4+i*2);g.gain.linearRampToValueAtTime(0,n+8+i*2);
            setTimeout(cy,(10+i*3)*1000);}
        o.connect(g);g.connect(mg);o.start();cy();bgOscillators.push({osc:o,gain:g});
    });
    function chime(){if(!soundOn)return;const f=[523.25,659.25,783.99,1046.5][Math.floor(Math.random()*4)];
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=0;
        g.gain.linearRampToValueAtTime(0.02,audioCtx.currentTime+0.1);
        g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+4);
        o.connect(g);g.connect(mg);o.start();o.stop(audioCtx.currentTime+4);
        setTimeout(chime,5000+Math.random()*10000);}
    setTimeout(chime,3000);
}
function stopAmbientSound(){bgOscillators.forEach(o=>{try{if(o.gain&&o.gain.gain)o.gain.gain.linearRampToValueAtTime(0,audioCtx.currentTime+1);setTimeout(()=>{try{o.osc.stop()}catch(e){}},1500)}catch(e){}});bgOscillators=[];}
function playSfx(type){
    if(!soundOn||!audioCtx)return;const g=audioCtx.createGain();g.connect(audioCtx.destination);
    if(type==='shuffle'){const bs=audioCtx.sampleRate*0.15,b=audioCtx.createBuffer(1,bs,audioCtx.sampleRate),d=b.getChannelData(0);for(let i=0;i<bs;i++)d[i]=(Math.random()*2-1)*0.3;const s=audioCtx.createBufferSource(),f=audioCtx.createBiquadFilter();f.type='bandpass';f.frequency.value=3000;s.buffer=b;g.gain.value=0.08;g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.3);s.connect(f);f.connect(g);s.start();s.stop(audioCtx.currentTime+0.3);}
    else if(type==='flip'){const o=audioCtx.createOscillator();o.type='sine';o.frequency.value=800;o.frequency.exponentialRampToValueAtTime(1200,audioCtx.currentTime+0.05);g.gain.value=0.06;g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.3);o.connect(g);o.start();o.stop(audioCtx.currentTime+0.3);}
    else if(type==='complete'){[523.25,659.25,783.99].forEach((f,i)=>{const o=audioCtx.createOscillator(),gg=audioCtx.createGain();o.type='sine';o.frequency.value=f;gg.gain.value=0;gg.gain.linearRampToValueAtTime(0.04,audioCtx.currentTime+0.1+i*0.15);gg.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+1.5+i*0.15);o.connect(gg);gg.connect(audioCtx.destination);o.start(audioCtx.currentTime+i*0.15);o.stop(audioCtx.currentTime+2);});}
}
function toggleSound(){soundOn=!soundOn;const b=document.getElementById('soundToggle');b.textContent=soundOn?'🔊':'🔇';b.classList.toggle('active',soundOn);if(soundOn){initAudio();startBGM();}else{stopBGM();}}
// ===== READING =====
function shuffleArray(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}}
// ===== 牌义图鉴 =====
var currentFilter = 'all';

function showEncyclopedia(){
    document.getElementById('homePage').classList.add('hidden');
    document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
    document.getElementById('encyclopediaPage').classList.add('active');
    document.getElementById('encyclopediaPage').classList.add('page-enter');
    filterEncy('all');
}

function filterEncy(type){
    currentFilter = type;
    var btns = document.querySelectorAll('.ency-filter');
    btns.forEach(function(b){b.classList.remove('active');});
    var labels = {'all':'全部','major':'大阿卡纳','wands':'权杖','cups':'圣杯','swords':'宝剑','pentacles':'星币'};
    btns.forEach(function(b){if(b.textContent.indexOf(labels[type])>=0) b.classList.add('active');});

    var cards = [];
    if(type==='all') cards = allCards;
    else if(type==='major') cards = majorArcana;
    else if(type==='wands') cards = wands;
    else if(type==='cups') cards = cups;
    else if(type==='swords') cards = swords;
    else if(type==='pentacles') cards = pentacles;

    var grid = document.getElementById('encyGrid');
grid.innerHTML = cards.map(function(c){
    return '<div class="ency-card" onclick="showEncyDetail('+c.id+')">'+
        '<div class="ency-card-img" data-cid="'+c.id+'"></div>'+
        '<div class="ency-card-name">'+c.name+'</div>'+
        '<div class="ency-card-en">'+c.en+'</div></div>';
}).join('');
var imgDivs = grid.querySelectorAll('.ency-card-img');
for (var i = 0; i < imgDivs.length; i++) {
    fillCardImg(imgDivs[i], parseInt(imgDivs[i].getAttribute('data-cid')));
}
}

function getSuitName(id){
    if(id<22) return '大阿卡纳 Major Arcana';
    if(id<36) return '权杖牌组 Suit of Wands';
    if(id<50) return '圣杯牌组 Suit of Cups';
    if(id<64) return '宝剑牌组 Suit of Swords';
    return '星币牌组 Suit of Pentacles';
}

function getCardNumber(id){
    if(id<22) return '编号 '+id;
    var inSuit = (id-22)%14;
    var ranks = ['王牌(Ace)','二','三','四','五','六','七','八','九','十','侍从(Page)','骑士(Knight)','王后(Queen)','国王(King)'];
    return ranks[inSuit];
}

function showEncyDetail(id){
    var card = allCards.find(function(c){return c.id===id;});
    if(!card) return;
    var imgUrl = getCardImageUrl(card.id);
    var html = '';

    // 头部：图片 + 基本信息
    html += '<div class="ency-detail-header">';
    html += '<div class="ency-detail-img" id="encyDetailImg"></div>';
    html += '<div class="ency-detail-info">';
    html += '<div class="ency-detail-name">'+card.name+'</div>';
    html += '<div class="ency-detail-en">'+card.en+'</div>';
    html += '<div class="ency-detail-id">'+getSuitName(card.id)+' · '+getCardNumber(card.id)+'</div>';

    // 正位关键词
    html += '<div class="ency-kw-section">';
    html += '<div class="ency-kw-label up">☀ 正位关键词</div>';
    html += '<div class="ency-kw-tags">';
    card.upright.forEach(function(k){html += '<span class="ency-kw-tag up">'+k+'</span>';});
    html += '</div></div>';

    // 逆位关键词
    html += '<div class="ency-kw-section">';
    html += '<div class="ency-kw-label rev">☽ 逆位关键词</div>';
    html += '<div class="ency-kw-tags">';
    card.reversed.forEach(function(k){html += '<span class="ency-kw-tag rev">'+k+'</span>';});
    html += '</div></div>';

    html += '</div></div>';

    // 正位详解
    html += '<div class="ency-section">';
    html += '<div class="ency-section-title">☀ 正位牌意详解</div>';
    html += '<div class="ency-section-text">'+card.uprightDesc+'</div>';
    html += '</div>';

    // 逆位详解
    html += '<div class="ency-section">';
    html += '<div class="ency-section-title">☽ 逆位牌意详解</div>';
    html += '<div class="ency-section-text">'+card.reversedDesc+'</div>';
    html += '</div>';

    // 感情方面
    if(card.love){
        html += '<div class="ency-section">';
        html += '<div class="ency-section-title">♡ 感情指引</div>';
        html += '<div class="ency-section-text">'+card.love+'</div>';
        html += '</div>';
    }

    // 事业方面
    if(card.work){
        html += '<div class="ency-section">';
        html += '<div class="ency-section-title">☆ 事业指引</div>';
        html += '<div class="ency-section-text">'+card.work+'</div>';
        html += '</div>';
    }

    // 综合建议
    if(card.advice){
        html += '<div class="ency-section">';
        html += '<div class="ency-section-title">✧ 综合建议</div>';
        html += '<div class="ency-section-text">'+card.advice+'</div>';
        html += '</div>';
    }

    // 象征解读（给大阿卡纳加额外的深度内容）
   // 象征解读（大阿卡纳专属）
var symbolism = getDeepSymbolism(card.id);
if(symbolism){
    html += '<div class="ency-section">';
    html += '<div class="ency-section-title">🔮 深度象征解读</div>';
    html += '<div class="ency-section-text">'+symbolism+'</div>';
    html += '</div>';
}
// 灵性启示（所有牌）
var spiritual = getSpiritualMeaning(card.id);
if(spiritual){
    html += '<div class="ency-section">';
    html += '<div class="ency-section-title">✦ 灵性启示</div>';
    html += '<div class="ency-section-text">'+spiritual+'</div>';
        html += '</div>';
    }

    document.getElementById('encyDetailContent').innerHTML = html;
    fillCardImg(document.getElementById('encyDetailImg'), card.id);
    document.getElementById('encyDetailModal').classList.add('active');
}

function closeEncyDetail(){document.getElementById('encyDetailModal').classList.remove('active');}
// 大阿卡纳深度象征
function getDeepSymbolism(id){
    var data = {
        0:"愚者脚边的悬崖象征着未知的飞跃。白色的玫瑰代表纯真与对美的渴望，手中的小包袱是过去的经验——轻便而不拖累。小白狗既是忠诚的伙伴，也象征着本能的直觉在提醒他注意脚下。编号0意味着他既在起点，也在终点，是整个愚者旅程的开端与归宿。山峰代表着他即将面对的精神考验。",
        1:"魔术师头顶的无限符号(∞)代表他连接了无限的宇宙能量。高举的权杖将天上的灵感引导到地上的现实。桌上的四件工具——权杖(火)、圣杯(水)、宝剑(风)、星币(土)象征四大元素已备齐。红色长袍代表行动的意志，白色内袍象征内心的纯净。他是天与地之间的桥梁，将想法显化为现实。",
        2:"女祭司坐在两根柱子之间——黑柱(Boaz)代表否定与神秘，白柱(Jachin)代表肯定与光明。她手中的卷轴是更高智慧的象征，半隐于斗篷之下意味着真相不会轻易示人。脚下的新月代表直觉与潜意识。身后的帷幕绣满石榴——象征丰饶与生命之谜。她是未显化的潜能与神秘知识的守护者。",
        3:"皇后周围繁茂的花园象征生命力与丰饶。心形盾牌上的金星(♀)符号代表爱与美。她头戴的十二星辰冠冕象征着与自然周期的连接。流水代表情感的自由流动，麦穗象征丰收和滋养。她是大地母亲的化身，提醒我们生命本身就是最大的创造。坐垫上的红色代表激情和感官享受。",
        4:"皇帝端坐在石头王座上，代表稳固不可动摇的权威。四个公羊头装饰象征白羊座——行动力和领导力。他手持权杖(生命力)和金球(世界的掌控)。盔甲之下穿着红袍，说明他的权力建立在行动和意志之上。荒芜的山脉暗示他选择了秩序与结构而非柔软与自然。他的数字4代表稳定、方向和基础。",
        5:"教皇坐在两名信徒之间，代表着精神权威和传统教导。他举起右手做祝福手势，两根手指指天两根指地，象征连接灵性世界与物质世界。三层冠冕代表身、心、灵三个层面的统治。交叉钥匙象征打开意识与潜意识之门的能力。他是传承智慧的桥梁，也代表既定秩序和集体信仰。",
        6:"恋人牌中天使的祝福代表更高力量对这段连接的认可。男人望向女人，女人望向天使，暗示着灵魂通过爱走向神性。生命之树和知识之树分别在两人身后，象征选择的永恒主题——是跟随本能还是追求智慧？蛇的出现提醒这是一个有代价的选择。这张牌的核心不仅是爱情，更是价值观的抉择。",
        7:"战车的两匹斯芬克斯一黑一白，代表需要驾驭的对立力量——理性与感性、光明与黑暗。没有缰绳，意味着驾驭靠的不是外力控制，而是内在意志。星辰华盖代表宇宙的庇护，方形胸甲象征坚定的意志。城市在身后渐远——他已经超越了舒适区。翅膀般的日月标志暗示精神力量支撑着物质世界的前进。",
        8:"力量牌中女子温柔地抚摸狮子的画面，是这张牌最核心的教导。狮子代表我们内心的原始欲望、愤怒和恐惧。女子没有用铁链和棍棒，而是用无限的温柔与耐心化解了野性。她头顶的无限符号与魔术师相同，暗示真正的力量源于与无限宇宙的连接。花环链接着两个存在，象征爱可以驯服一切。",
        9:"隐士站在雪山之巅，独自持灯。灯中的六芒星是所罗门之星，象征智慧之光。灰色斗篷代表中立和隐匿——他选择退出世俗的纷争。手杖不仅用于行走，更代表内在权威。他是愚者旅途中最安静的一站——在这里，外在的冒险暂停，内在的探索开始。山顶代表精神成就的高度，但他仍在前行。",
        10:"命运之轮上的四个角落分别是金牛(土)、狮子(火)、天鹰(水)、天使(风)，对应四大元素和四福音。轮上的三个生物代表上升(蛇/赛特)、下降(阿努比斯)、和超越(斯芬克斯)的三种力量。轮边的字母TARO可以环形阅读为TARO-ROTA-ORAT-TORA，暗示塔罗本身就是命运之轮的映射。",
        11:"正义手持天秤与宝剑。天秤代表公平衡量一切，宝剑代表执行判决的力量和清晰的判断。她的紫色帷幕与女祭司相呼应——正义也有神秘和直觉的面向。一只脚微微露出长袍，暗示真相终将显现。方形的王冠代表有序的思维。在因果法则中，每一个选择都会带来相应的后果——不是惩罚，而是平衡。",
        12:"倒吊人被绑在活的T型十字架(Tau Cross)上，树上长出新叶象征这种牺牲带来了新生。他的表情是平静甚至喜悦的——这不是被迫的困境，而是主动的选择。头周围的金色光环暗示他在这个颠倒的视角中获得了启示。交叉的双腿形成数字4——在不稳定中创造了稳定。这张牌教导我们：有时候投降就是最大的力量。",
        13:"死神骑在白马上——白色代表纯净，暗示死亡本身是中性的净化力量。倒下的国王说明死亡面前众生平等。远方的双塔之间有一轮初升的太阳——最有力的重生象征。地上的花朵提醒我们生命是一个循环。旗帜上的白玫瑰是生命力和美的象征。死神的盔甲说明他不可被打败，但他带来的是必要的转变而非毁灭。",
        14:"节制天使一脚在水中(潜意识)一脚在地上(意识)，完美连接两个世界。从一个杯子倒向另一个的水代表灵魂能量的流动与平衡。远方的金色王冠代表通过平衡达到的精神成就。胸前的三角形中的方形象征灵性(三)包含并超越物质(四)。鸢尾花象征希望与净化。这是炼金术中'伟大工作'的视觉化呈现。",
        15:"恶魔的火炬是倒转的——象征对神圣之光的扭曲和滥用。锁链松松地挂在两个人形身上，意味着他们随时可以选择离开，却被自己的欲望和恐惧绑住。恶魔头上的倒五芒星代表物质凌驾于精神。角和翅膀是对教皇的暗黑镜像。这张牌最深的教导是：大多数囚笼都没有上锁，是我们自己选择待在里面。",
        16:"闪电击中塔的王冠——虚假的权威和自我被真相的力量摧毁。从塔上坠落的两个人代表从虚假信念中被解放(虽然过程痛苦)。22滴火焰代表希伯来文的22个字母，也对应22张大阿卡纳——整个生命的课题在这一刻被重新洗牌。黑暗的背景中，闪电本身就是唯一的光源——有时候毁灭性的真相是最好的照明。",
        17:"星星牌中女子跪在水边，将水同时倒入池中(潜意识)和大地(物质世界)，象征灵感同时滋养内在和外在。天上八颗星——一颗大星被七颗小星围绕，大星代表核心的灵魂之光，七颗小星对应七个脉轮。她完全裸露代表在宇宙面前毫无隐藏的真实。背景中的鸟(朱鹭)是古埃及智慧之神透特的象征。这是暴风雨后最宁静的疗愈。",
        18:"月亮照耀着一条从水中蜿蜒到远方山脉的道路——这是潜意识到意识的旅程。龙虾从水中爬出象征最深层恐惧的浮现。狗和狼分别代表驯化的本能和野性的本能，两者在月光下同时嚎叫。双塔标记着已知与未知的边界。水面的波动暗示情绪的不稳定。月亮只反射太阳的光——提醒我们眼前所见可能只是幻象而非真相。",
        19:"太阳牌中赤裸的孩子骑在白马上，代表纯真、自由和与生俱来的喜悦。向日葵面朝观者而非太阳——暗示你自己就是光源。红色旗帜象征行动力和生命力的全面复苏。石墙代表已经克服的障碍(塔牌的废墟被重建)。太阳放射的直线和曲线代表理性之光和感性温暖的完美融合。这是整副牌中最积极的能量。",
        20:"审判中天使吹响号角——这是灵魂的觉醒之号。从棺材中站起来的人们代表从旧生活中重生，赤裸意味着放下了一切伪装。十字旗帜代表四大元素的整合与平衡。蓝灰色的山脉代表已经翻越的精神考验。男人、女人、孩子代表意识、潜意识和更新的自我。这不是终末审判，而是灵魂对自己一生旅程的清醒回顾和整合。",
        21:"世界牌中央的舞者被月桂花环围绕——胜利与完成的象征。她手持两根权杖代表平衡了给予和接受、上升和下降的力量。四角的生物与命运之轮相同，但这一次它们不再转动——稳定的觉知已经达成。花环形成的椭圆形是宇宙之蛋，象征无限的可能。紫色丝带绑成无限符号，回应了魔术师的无限——旅程的终点也是新的起点。",
        22:"权杖王牌中，一只从云中伸出的手紧握着生机勃勃的木杖——这不是雕琢过的权杖，而是一根活着的、正在发芽的树枝。叶子从木杖上向四面八方生长，象征着创造力的蓬勃爆发。云代表精神世界，手从云中伸出意味着这份灵感是来自更高维度的礼物。远方的城堡象征着这个创意种子最终可以建造的宏伟成就。飘落的叶子既是祝福，也在暗示——灵感虽丰沛，但需要落地才能生根。",
        23:"权杖二中，一个穿着华服的人站在城堡的露台上，右手握着一根权杖，左手托着一个小地球。他凝望着远方广阔的海洋和山脉。固定在墙上的另一根权杖代表已经拥有的成就和安全感，而手中的地球象征着尚未征服的广阔世界。他站在中间——既不在室内的安全中，也没有踏上旅途。这是决策前最安静的时刻。红色的玫瑰和白色的百合分别代表激情和纯洁，暗示这个选择需要两者的平衡。",
        24:"权杖三中，一个人背对着我们站在悬崖边，眺望着远方金色的海洋，三艘商船正在航行。他手握的权杖已经稳稳地插在地上，代表基础已经建立。三根权杖形成稳固的三角结构，象征着事业初步成型的稳定。金色的天空暗示丰收的前景。他的红色斗篷象征行动的勇气，而从背后看不到他的表情——因为真正的远见者不需要回头寻求认可，他只需注视前方。",
        25:"权杖四中，四根权杖上系满了花环和缎带，构建出一个喜庆的门廊。远处是城市的轮廓，前景中人们举手欢庆。花环是胜利和丰收的古老象征。四根权杖形成的方形门框代表稳定和保护——你创造了一个安全的空间。城市代表社会的认可。人们手中高举的花束象征着集体的祝福。这是一个暂停键——在旅途中的驿站，庆祝已经走过的路，为接下来的行程蓄力。",
        26:"权杖五中，五个人各自挥舞着权杖在混战——但仔细看，他们的姿态更像是在比试而非真正的战斗。没有人受伤，没有流血。这场冲突的本质是建设性的——不同观点的碰撞产生新的火花。五根权杖交叉形成的图案像是一颗星星——暗示混乱中隐藏着秩序。背景的天空是清朗的，说明这场风暴只在表面，不会动摇根基。混乱是创造的前奏。",
        27:"权杖六中，一个骑者头戴月桂冠，骑在白马上凯旋。他手持被绿色花环装饰的权杖，身后跟随着欢呼的人群。白马代表纯洁的力量和精神上的胜利。月桂冠自古希腊以来就是荣耀的象征。他的姿态不是傲慢的——身体略微前倾，表示谦逊。人群中也有人举着权杖，暗示这份荣耀不只属于一个人，而是集体努力的成果。胜利是甜美的，但真正的王者懂得分享。",
        28:"权杖七中，一个人站在高处，独自面对着从下方攻来的六根权杖。他的姿态是防御性的但充满力量——双脚稳稳地站在山丘上，利用地形的优势。高处的位置象征道德制高点或坚定的信念。他穿着绿色的衣服，代表成长和生命力。六根进攻的权杖虽然数量更多，但它们是从下方攻来——暗示这些挑战虽然多，但不如他的立场稳固。坚守高地，考验的是耐力而非蛮力。",
        29:"权杖八中，八根权杖在空中平行飞行，划过清澈的蓝天，朝着远方的山丘和河流急速前进。它们没有被任何人握着——这是纯粹的能量在自由流动。八这个数字在很多传统中代表无限(将8横放就是∞)。权杖上的嫩叶在风中颤动，说明它们是活的、有生命力的。地面上的河流象征情感的流动。一切都在运动中——没有障碍，没有犹豫。这是宇宙说'放手让它飞'的时刻。",
        30:"权杖九中，一个受伤的战士靠着一根权杖站立，身后是其余八根权杖组成的防御墙。他头上绑着绷带，表情疲惫但坚毅——他经历了战斗，受了伤，但没有倒下。绷带是白色的，象征着精神的纯洁在考验中依然完整。八根权杖整齐排列在他身后，说明他之前的八场战斗都赢了。这是最后一关。他的眼神向前注视——不是在回顾伤痛，而是在准备迎接下一步。",
        31:"权杖十中，一个人弯着腰，艰难地扛着十根权杖向前走。他的身体几乎被权杖压得看不见——只能看到他紧握的双手和沉重的脚步。远方有一座城镇，代表他的目标。十根权杖本身代表已经完成的十个阶段的努力——它们不是无用的负担，而是成就的重量。问题不是这些成就，而是他试图同时搬运所有的东西。大地的颜色是肥沃的棕色，暗示只要放下一些，就能在这片土地上种出更多。",
        32:"权杖侍从是一个年轻人，双手捧着一根权杖，好奇地端详着上面冒出的嫩芽。他的穿着是明亮的黄色和橙色——火元素的颜色。他站在干燥的大地上，但权杖上的绿叶证明生命可以在任何环境中萌发。他的帽子上有一根红色羽毛，象征着对冒险的渴望。他的表情是惊奇和兴奋的——像是第一次发现火的孩子。沙漠般的背景暗示他还没有太多经验，但这正是起点的样子。",
        33:"权杖骑士骑在一匹奔腾的红马上，手持权杖向前冲锋。红马象征激情和行动力的爆发。马的前蹄腾空，暗示他已经离开了安全的地面。骑士的盔甲上装饰着火蜥蜴——传说中能在火中生存的生物，象征对激情的掌控。他的黄色披风在风中飘扬，代表光明和乐观。背景中有三座金字塔——远大的目标。但注意，马的方向略显混乱——热情需要缰绳，否则就变成了横冲直撞。",
        34:"权杖王后端坐在王座上，一手持向日葵，一手持权杖。她的王座扶手上雕刻着狮子——火元素的守护兽。一只黑猫蹲坐在她脚边，象征着对神秘和直觉的连接。向日葵代表生命力、忠诚和对光明的追求。她的黄色长裙代表智慧和温暖。背景是沙漠中的绿洲——她有能力在最荒芜的环境中创造繁荣。她的表情是温暖而自信的——不需要证明什么，她的存在本身就是光。",
        35:"权杖国王坐在王座上，手持一根发芽的权杖。他的王座上也刻着火蜥蜴，但与骑士不同，国王的火蜥蜴是咬着自己尾巴的——象征着完成的循环和对火元素的完全掌握。他的斗篷是红色的(行动)，内衬是绿色的(成长)。脚边有一只小蜥蜴——暗示他能在最微小的事物中看到潜力。他的目光不是看着远方，而是看着正前方——一个真正的领导者关注的是当下需要做什么。",
        36:"圣杯王牌中，一只从云中伸出的手托举着一个金色的圣杯。杯中流出五道水流，落入下方布满莲花的湖面。五道水流代表五种感官——暗示这份情感不是抽象的，而是通过身体真切感受到的。圣杯上的W形代表水元素。从杯中飞出一只白鸽，口衔圣饼——这是圣灵降临的象征，意味着这份爱有着神圣的源头。莲花从泥水中绽放——最纯粹的爱往往在最不完美的环境中诞生。",
        37:"圣杯二中，一男一女面对面站立，各自举着一个杯子互相敬酒。在他们上方，两条蛇缠绕在一根带翼的权杖上——这是赫尔墨斯之杖（商神杖），代表沟通、治愈和两个对立面的和谐统一。狮子头象征着激情和欲望。两人之间的距离不远不近——亲密但不失独立。他们的衣服颜色不同，代表他们是不同的个体。真正的伙伴关系不是成为同一个人，而是两个不同的人选择走在一起。",
        38:"圣杯三中，三个女子举杯庆祝，头上戴着花环，脚下是丰收的果实和南瓜。三个女子可以代表命运三女神、三相女神或者简单的友谊纽带。花环象征荣耀和庆典。丰收的果实代表共同努力的成果。她们围成一个圈——圆形是完整和无限的象征。每个人的杯子都举得一样高——这是平等的欢庆，没有谁比谁更重要。集体的喜悦比个人的成就更加甜蜜。",
        39:"圣杯四中，一个人坐在树下，双臂交叉，面前有三个杯子，但他的眼睛只盯着它们不看。云中伸出一只手递给他第四个杯子——但他没有注意到。这是整张牌最关键的象征：新的机遇正在被递到面前，但因为沉浸在对现有事物的不满中而完全忽视了。树提供了荫凉（舒适区），他的坐姿很封闭。三个杯子没有被打翻——他拥有的并没有失去，只是他对它们失去了兴趣。",
        40:"圣杯五中，一个黑色斗篷的人低头注视着三个被打翻的杯子，里面的水正在流出。但在他身后，两个杯子依然完好地立着——他没有看到它们。远处有一座桥通往一座城堡——代表回家的路。河水在桥下流过——情绪像水一样需要流动。黑色斗篷象征悲伤的沉重感，但它是可以脱下的。整张牌的教导就在那两个被忽视的杯子里：你以为你失去了一切，但转身就会发现并非如此。",
        41:"圣杯六中，一个较大的孩子把装满白色花朵的杯子递给一个较小的孩子。六个杯子里都盛满了花。一座古老的房子在背景中，一个成年人在远处走开。花朵代表纯真的快乐和美好的回忆。孩子之间的给予是无条件的——没有交易，没有期望，只有单纯的分享。成年人走开可能代表当下的'你'，暂时回到了童年的回忆中寻找慰藉。六角星形的花朵排列暗示和谐与平衡。怀旧不是逃避，而是找回失落的纯真。",
        42:"圣杯七中，一个黑色剪影面对着七个杯子，每个杯子里浮现出不同的幻象——城堡、珠宝、花环、龙、蛇、光辉的人影和一张被布覆盖的神秘面孔。这些幻象代表人心中的各种欲望和幻想。它们漂浮在云中——美丽但不真实。杯子的排列形成了一个弧形，像一面镜子映照着观者的内心。黑色的剪影说明观者被幻象的光芒遮蔽了自己的形象。选择的关键不是哪个最闪亮，而是哪个是真实的。",
        43:"圣杯八中，一个穿红衣的人在月光下转身离开八个整齐叠放的杯子，朝着山脉走去。红色代表勇气——离开需要行动的决心。八个杯子排列得很整齐，中间还缺了一个——象征着看似完美的生活中有一个空洞。月亮代表直觉和潜意识——他是在夜晚出发的，暗示这个决定来自内心而非理性。水和山代表情感和障碍。他的背影孤独但坚定——有些旅程注定要一个人走。",
        44:"圣杯九中，一个满足的商人坐在木凳上，双臂交叉，微笑着。他身后是一面弧形的架子，上面整齐排列着九个金色的杯子。他的衣服是白色的(纯洁)，帽子是红色的(满足的热情)。他的坐姿很放松但不懒散——这是一个对自己的成就感到安心的人。九个杯子排列的弧形像是一道彩虹——愿望成真的象征。整张牌散发着温暖的金色光芒。注意他是独自一人——真正的满足不需要他人的验证。",
        45:"圣杯十中，一对夫妇站在彩虹下，伸开双臂拥抱，两个孩子在旁边跳舞。十个杯子排列在彩虹中。远处是一栋温馨的房屋和一条蜿蜒的小河。彩虹是暴风雨后的承诺——最深的幸福往往在最深的困难之后。十个杯子排成完美的弧形——情感的完整循环。孩子们的舞蹈代表纯真的喜悦。河水静静流淌——情感不再波涛汹涌，而是平静而深沉。房屋代表心灵的归宿。这是塔罗中最温暖的画面之一。",
        46:"圣杯侍从是一个年轻人，站在海边，温柔地注视着杯中游动的一条小鱼。他穿着蓝色的衣服上绣满了花朵，代表情感的丰富和对美的敏感。鱼是潜意识的象征——从水(情感)的深处浮上来的讯息。他的表情是好奇和温柔的——他不是在分析这条鱼，而是在感受它。海浪在他身后轻轻拍打——情绪的海洋并不可怕。他的姿态稳定，双脚踏在坚实的地面上——感性但不失根基。",
        47:"圣杯骑士骑在一匹白马上，手持圣杯，缓缓向前行进。与权杖骑士的奔腾不同，他的马步伐优雅而从容。他穿着带有鱼鳞图案的盔甲，与水元素深度连接。头盔上有翅膀，象征着灵感和想象力的飞翔。白马代表精神的纯洁。他面前有一条河——情感的象征。杯中没有水溢出——即使在行动中也保持着情感的稳定。河对岸有一片风景——理想的目标。他不急不躁，因为他知道真正重要的事情不能被催促。",
        48:"圣杯王后坐在水边华丽的王座上，手持一个精致的封闭式圣杯——她是唯一一个杯子有盖的宫廷牌成员。这象征着她能保守秘密，也代表情感的深不可测。王座上刻满了海精灵和贝壳。她的脚浸在水中(与情感世界直接接触)，但坐在坚实的石头上(保持稳定)。岸边有彩色的鹅卵石——经过水的冲刷变得圆润，就像经历过的情感让灵魂变得柔软。她的凝视温柔但有深度——一个能看穿你灵魂的人。",
        49:"圣杯国王坐在浮在水面上的石头王座中——看似矛盾但完美平衡。他一手持杯，一手持权杖——情感与行动的统一。他的长袍是蓝色的(水)但里面是红色的(火)——感性的外表下有行动的热情。背景一边是平静的水面，另一边是跳跃的海豚和航行的船——他能同时驾驭内心的平静和外在的波澜。脖子上的鱼形吊坠连接着他与深层潜意识。他不回避任何情绪，但也不被任何情绪控制。",
        50:"宝剑王牌中，一只从云中伸出的手紧握着一把向上直指的双刃剑。剑尖上戴着一顶金色的王冠，两侧垂下月桂枝(胜利)和棕榈枝(和平)。双刃象征真相的两面性——它既能解放你，也能伤害你。云代表精神世界，剑穿透云层意味着思维突破了迷雾。王冠代表思维的最高成就。背景中有山脉和悬崖——真相往往出现在高处，获取它需要攀登。六颗小光球是种子——一次清晰的顿悟可以播下多个新开始。",
        51:"宝剑二中，一个蒙着眼睛的女子坐在海边，双手交叉各持一把剑，保持着精确的平衡。蒙眼布不是被迫的，而是她自己选择的——暂时屏蔽外部信息，转向内在的感知。两把剑交叉形成了一个X——代表选择的十字路口。身后的海面上有起伏的波浪和一弯新月——情绪在暗流涌动，但她选择了保持静止。她坐在石头上——即使在情绪的海洋旁，理性依然有坚实的基础。平衡不是永恒的状态，而是每一刻的选择。",
        52:"宝剑三中，三把剑直直地刺穿一颗红色的心脏。背景是灰暗的雨云和倾盆大雨。心脏是鲜红的——痛苦是真实的、鲜活的、无法回避的。三把剑代表头脑、情感和灵性三个层面的创伤。雨水既是悲伤的象征，也是净化的力量——每一滴眼泪都在冲洗伤口。没有人物出现在画面中——在这种程度的痛苦面前，身份和角色都消失了，只剩下纯粹的感受。但心脏虽被穿刺，并没有碎裂——它能承受的比你想象的更多。",
        53:"宝剑四中，一个骑士的石像躺在教堂的石棺上。他的双手合十在胸前，一把剑平放在身侧，三把剑挂在上方的墙上。这不是死亡，而是神圣的休息——中世纪骑士的'守夜礼'。彩色玻璃窗透进柔和的光线，暗示即使在最深的静止中，精神之光也在渗入。石棺上的雕刻展示了祈祷的姿态——休息本身就是一种祈祷。三把剑高悬但不会落下——你的忧虑还在，但在这个安全的空间里它们无法触及你。",
        54:"宝剑五中，一个胜利者拾起了战场上遗落的剑，脸上带着得意的笑容。两个失败者在远处沮丧地离去。天空布满了乌云，水面波涛汹涌。但仔细看——胜利者手中的剑是别人的，他赢得的是别人的损失。乌云暗示这种胜利不会带来晴天。两个离去的人虽然失败，但他们还在一起——而胜利者是孤独的。水面的波涛代表这场冲突搅乱了所有人的情绪。有些胜利的代价是孤独。",
        55:"宝剑六中，一个撑船的人载着一个女人和一个孩子渡过平静的水面。船上插着六把剑。远处的水面从波涛变为平静。女人的头低垂着——她还沉浸在刚刚离开的痛苦中。孩子紧靠着她——脆弱的部分需要保护。撑船的人代表引导者或更高的自我。六把剑代表过去的思维模式——它们还在船上，但不再被握在手中了。这不是逃跑，而是有意识地从一个阶段过渡到下一个。",
        56:"宝剑七中，一个人鬼鬼祟祟地抱着五把剑离开营地，身后还留着两把。他的姿态是弯腰的、偷偷摸摸的——暗示他的方法不够光明正大。但也可以从另一个角度理解：他在智取而非力战。五把剑太多了——一个人抱不稳这么多，暗示贪心可能导致失败。帐篷代表别人的领地。远处有群山——暗示还有更远的路要走。这张牌的关键不在于道德判断，而在于问：你的手段配得上你的目的吗？",
        57:"宝剑八中，一个女人被绑住双手，蒙着眼睛，周围插着八把剑形成了一个笼子。她站在泥泞的水中，背后是荒芜的城堡。但最关键的细节是：绳索绑得很松，她随时可以挣脱。蒙眼布也没有系紧。八把剑虽然围绕着她，但剑尖朝上而非指向她——它们不是攻击，而是她自己建造的思维围墙。泥泞的水代表混乱的情绪。这张牌的核心信息：你的牢笼是自建的，钥匙一直在你手里。",
        58:"宝剑九中，一个人坐在床上，双手捂住脸。九把剑横挂在他身后黑暗的墙壁上。这是凌晨三点的场景——万物沉睡时恐惧最为猖獗。床上的被子上绣着黄道十二宫和玫瑰——暗示即使在最黑暗的时刻，宇宙的秩序和美依然存在。九把剑是他的忧虑和噩梦——但它们挂在墙上，而不是刺在他身上。窗外是完全的黑暗——他无法看到天很快就要亮了。恐惧在黑暗中被放大了一百倍。",
        59:"宝剑十中，一个人面朝下倒在地上，十把剑刺在他的背上。红色的天空和黑色的云层构成了最阴暗的背景。但远方的地平线上有一道金色的光——黎明即将到来。平静的水面在远处闪着微光——情感的海洋不会永远波涛汹涌。十把剑代表思维模式的终极崩溃——所有旧的想法和信念都已经被击穿了。这看起来是终结，但那道金色的光线说明：这也是重生的第一缕曙光。结束即开始。",
        60:"宝剑侍从是一个年轻人站在多风的山丘上，双手高举一把剑，像是在检验它的重量和平衡。他的身体向后倾斜，头发和衣服在风中飞扬——风（空气元素）的力量正在考验他。远处有起伏的云层和飞鸟。他的表情专注而认真——对他来说，这把剑还是新的，每一次挥动都是学习。地面崎岖不平——知识的道路不是平坦的。但他站在高处——好奇心已经把他带到了比大多数人更高的地方。",
        61:"宝剑骑士骑在一匹疾驰的白马上，手持长剑向前冲锋。白马的四蹄离地——完全不接触大地，象征着纯粹的思维可能脱离现实。风中的云层和弯曲的树木说明他正在制造风暴。他的盔甲上装饰着蝴蝶和飞鸟——思想的轻盈和自由。但马的速度太快了——地面上的花朵被踩碎了，暗示速度可能带来无意识的伤害。剑指向前方——目标明确，但路上的一切都被忽略了。快不等于好。",
        62:"宝剑王后坐在石头王座上，右手高举宝剑直指天空，左手微微伸出似乎在邀请什么。她的王座矗立在高处，周围是风和云。她的表情冷静但不冰冷——这是经历过暴风雨之后的平静。王座上雕刻着蝴蝶（蜕变）和天使（精神指引）。她穿着蓝色斗篷——智慧和真相的颜色。头上的王冠由蝴蝶装饰——她的权威来自于个人的蜕变经历。远处有一只鸟孤独地飞翔——独立的思想者往往是孤独的，但也是自由的。",
        63:"宝剑国王端坐在高高的王座上，一手持剑，一手放在膝上。他的王座上刻着新月和蝴蝶。背景中的天空既有乌云也有蓝天——他能同时看到光明和黑暗。两棵树在远处——一棵茂盛一棵枯萎，代表他对生死、成败的平等注视。紫色的长袍代表智慧和灵性。他的剑略微倾斜而非垂直——代表实用主义的灵活而非教条的僵硬。他的目光穿透画面看着观者——仿佛在说：让我看看你隐藏了什么。",
        64:"星币王牌中，一只从云中伸出的手托着一枚巨大的金币。金币上刻着五芒星——代表五大元素（地、水、火、风、灵）在物质世界的统一。手掌下方是一座繁花盛开的花园，有拱形的绿篱和盛放的百合。花园通向远方的山脉——物质的丰盛可以延伸到很远。云层代表这份丰盛来自精神世界的赐予。百合象征纯洁——暗示真正的丰盛需要纯净的意图。这不只是一枚金币，而是一颗等待播种的种子。",
        65:"星币二中，一个年轻人头戴高帽，手中托着两枚金币，在它们之间舞动，形成了无限符号(∞)的轨迹。背景中有波涛起伏的海面和两艘船。他的表情轻松愉快——平衡对他来说像游戏一样。无限符号代表能量的永恒循环。高帽象征着乐观和幽默感。海浪代表生活的起伏——但他站在岸上，没有被卷入。两艘船代表两个同时进行的项目或方向。真正的平衡不是静止，而是优雅地在变化中保持节奏。",
        66:"星币三中，一个石匠站在修道院的石拱门前工作。他手持工具正在雕刻石柱上的花纹。两个身着长袍的人——一个僧侣和一个贵族——正在审视设计图。三枚星币被嵌入石拱中，形成了一个三角形。修道院象征着神圣的空间。三个人代表构想者、资助者和执行者——每一个伟大的作品都需要这三方合作。石头上的花纹既复杂又精美——只有耐心和技艺的结合才能创造出持久的美。",
        67:"星币四中，一个人紧紧抱着一枚金币，踩在两枚金币上，头顶还顶着一枚。他在一座城市的边缘，背景中有华丽的建筑。他的表情紧张而戒备——害怕失去他所拥有的一切。他的姿态是封闭的——保护性的，但也是孤立的。城市在他身后——他选择远离人群来保护自己的财富。但注意他的姿势是不可持续的——你不能永远这样站着。踩在金币上意味着他把财富当作地基，而不是让它流动。安全感变成了牢笼。",
        68:"星币五中，两个穿着破旧的人在风雪中蹒跚前行。他们经过一座教堂的彩色玻璃窗——窗内透着温暖的光。窗上刻着五枚星币组成的五芒星。其中一个人赤脚，另一个缠着绷带——物质和身体的双重困苦。但教堂的门就在旁边——帮助近在咫尺。五芒星是保护和庇佑的符号。暴风雪象征着外在环境的严酷。他们是否选择走进教堂，取决于他们是否愿意放下骄傲接受帮助。困境往往不是因为缺乏资源，而是因为看不到它。",
        69:"星币六中，一个穿着华丽的商人手持天平，将金币分给两个跪着的乞丐。六枚星币平均分布。商人的衣着是紫色的——代表灵性的慷慨，而不仅仅是物质的施舍。天平代表公平——每个人得到他们需要的份额。乞丐的姿态是接受性的但有尊严的——接受帮助不等于丧失尊严。背景中有一座城市——这发生在社区之中。六这个数字代表和谐——给予和接受的完美循环。每一次慷慨的给予都是在播种未来的丰收。",
        70:"星币七中，一个农夫靠在锄头上，凝视着灌木丛上挂满的七枚金色果实（星币）。他的表情带着满足但也有一丝忧虑——收获看起来不错，但是否已经足够？他的工作服沾满了泥土——代表真实的辛勤付出。灌木丛健康而茂盛——他的耕耘方法是正确的。远处的山脉和金色的天空暗示着更大的丰收还在未来。停下来评估是明智的——但不要在评估中耗费太多时间而错过最佳收割期。信任你已经播下的种子。",
        71:"星币八中，一个年轻的工匠坐在工作台前，专注地雕刻着星币。他面前已经完成了六枚精美的星币，整齐地挂在展示架上，手中正在雕刻第七枚，旁边还有一枚等待加工。他穿着工匠的围裙，工具整齐地排列在身边。小镇在远处的背景中——世界在外面运转，但他选择了专注于手中的作品。每一枚完成的星币都比前一枚更精美——这是可见的进步。八这个数字代表技艺通过重复达到的完美。没有捷径，只有不断练习。",
        72:"星币九中，一位衣着华贵的女子独自站在葡萄园中。九枚星币排列在她周围的灌木丛上，像是她花园中自然生长的果实。一只猎鹰停在她戴着手套的手上——猎鹰象征着精准的眼光和独立的精神。她的表情是满足而优雅的——这不是暴发户的炫耀，而是长期积累的从容。葡萄园代表多年的耐心培育。蜗牛在她脚边——缓慢但确定的进步。她不需要任何人来验证她的成功——她的花园本身就是证明。",
        73:"星币十中，一位老人坐在家庭的拱门下。拱门上的十枚星币排列成生命之树的图案。他的家人——孩子、孙辈、甚至宠物——围绕在他身边。两只白狗象征忠诚和守护。城堡和庄园在背景中——代表多代人建立的家业。老人的长袍上绣满了葡萄藤——丰收和传承的象征。生命之树的排列暗示这份财富不仅是物质的，更是精神的传承。每一代人都在树上加上自己的枝叶。最深的富足是知道你的爱会继续活在后来的人心中。",
        74:"星币侍从是一个年轻人站在花草繁茂的田野中，双手小心翼翼地托举着一枚星币，像是在研究它。他穿着绿色和棕色的衣服——大地的颜色。脚下的土地肥沃——他站在一个充满潜力的环境中。远处有一片新开垦的耕地——他的旅程才刚刚开始。他抬头望向星币的姿态像是在对它许愿——梦想和现实的第一次接触。头上的红色帽子代表行动的意愿。一切伟大的成就都始于这样一个时刻——手握一粒种子，心怀一片森林。",
        75:"星币骑士骑在一匹沉稳的黑马上，手持一枚星币。与其他骑士的动态姿势不同，这匹马几乎是静止的——四蹄稳稳地踏在地面上。骑士的盔甲上装饰着橡树叶和橡子——象征缓慢但坚实的成长。背景是一片广阔而平坦的耕地——没有戏剧性的山峰或海洋，只有朴实的大地。他的目光专注地看着手中的星币——他不急于到达任何地方。在一个追求速度的世界里，他的慢是一种力量。真正持久的东西都是慢慢建造的。",
        76:"星币王后坐在花园中的石头王座上，膝上放着一枚大大的星币。她周围是繁花似锦的花园——玫瑰、百合、各种果树。一只兔子在她脚边——代表丰饶和繁殖。王座上雕刻着水果和天使——物质的丰盛与精神的祝福合一。她的表情宁静而满足——不是因为她拥有很多，而是因为她与自己拥有的一切深度连接。她看着星币的眼神温柔——像看着自己的孩子。这座花园不是一夜之间建成的，它是年复一年的爱与耐心的结晶。",
        77:"星币国王坐在被葡萄藤装饰的沉重王座上。他穿着绣满葡萄和金币图案的长袍。一只牛头刻在王座上——金牛座的象征，代表稳定、耐心和物质的掌控力。他一手持权杖（世俗权力），一手轻放在膝上的星币（财富）。他的城堡在远处——他建造了一个帝国。他的表情是满足但也有一丝疲惫——维持一个帝国比建造它更需要智慧。脚下的花园精心打理——他不仅创造财富，也享受财富。最终极的奢侈不是拥有什么，而是有时间去欣赏你所拥有的。"
    };
    return data[id] || '';
}
   

// 大阿卡纳灵性启示
function getSpiritualMeaning(id){
    var data = {
        0:"灵性启示：愚者代表灵魂投胎前的纯净状态——拥有无限的潜能，不被任何经验局限。在灵性修行中，愚者提醒我们保持'初心'——像第一次看见世界一样去体验每一刻。当你能够放下所有'我知道'的执念，真正的智慧才会到来。愚者的勇气不是无知的莽撞，而是信任生命本身的深层智慧。",
        1:"灵性启示：魔术师教导我们'如在其上，如在其下'——内在的想法会显化为外在的现实。你的意念、语言和行动都是创造的工具。在冥想中观想你想要的生活，然后在现实中采取行动。魔术师提醒你：你不是生活的旁观者，你是生活的创造者。专注你的意图，你就是自己命运的魔术师。",
        2:"灵性启示：女祭司代表直觉——那个不经由逻辑推理就'知道'的部分。她教导我们学会安静地坐着，不做任何事，只是存在。在静默中，更高的智慧会像月光一样慢慢渗透进来。如果你总是在思考和行动，灵魂的声音就会被淹没。留出独处的空间，让那个更深层的自己来指引你。",
        3:"灵性启示：皇后代表神圣女性能量——接纳、滋养、创造。她提醒我们通过感官来体验灵性：大自然的美、食物的味道、音乐的振动都是灵魂的养分。不要把灵性局限在冥想室中，走进花园，赤脚踩在泥土上，感受风——这就是最真实的灵性体验。你的身体是灵魂的花园，好好照料它。",
        4:"灵性启示：皇帝代表神圣男性能量——保护、建造、引导。灵性成长需要纪律和结构：固定的冥想时间、持续的学习、明确的边界都是灵性实践的基础。皇帝提醒我们，自由不是无序——真正的自由需要内在纪律的支撑。为你的灵性修行建立一个稳固的框架，然后在其中自由地探索。",
        5:"灵性启示：教皇代表灵性传承——那些经过千百年验证的智慧传统。有时候我们不需要重新发明轮子，而是谦虚地向前人的智慧学习。找到一个共鸣的灵性传统或导师，让他们的经验照亮你的道路。同时记住，最好的老师会引导你找到自己内在的导师，而不是让你永远依赖外在的权威。",
        6:"灵性启示：恋人牌的深层含义是灵魂的选择——每一刻你都在选择成为怎样的人。它代表内在男性与女性能量的整合，头脑与心灵的统一。当你的想法、感受和行动完全一致时，你就活出了真实的自己。不要因为恐惧而做选择，要因为爱。你选择的不只是一件事或一个人，而是一种存在方式。",
        7:"灵性启示：战车代表通过意志力驾驭二元对立的能力。在灵性道路上，你会同时感受到黑暗和光明、恐惧和信心、执着和放手的拉扯。战车教导你不要消灭任何一方，而是让两股力量协调地推动你前进。你的灵魂就是那个驾驭者——超越了对立，在中心保持平衡，坚定地朝着目标前行。",
        8:"灵性启示：力量牌的灵性教导是：不要与自己的阴暗面作战，而是用爱去拥抱它。你的愤怒、恐惧、嫉妒都是受伤的内在小孩在呼唤爱。当你用无条件的接纳面对自己的每一面，内在的野兽就会自然地安静下来。这种力量不消耗能量，反而生成能量——因为你不再与自己对抗了。",
        9:"灵性启示：隐士的灯不是为了照亮远方，而是照亮脚下的每一步。灵性成长不是一个宏大的目标，而是每一刻的觉察。隐士选择独行不是因为他不爱人，而是因为他知道——真正的连接始于与自己的深度连接。在独处中找到的光明，最终会照亮你身边的每一个人。你的内在之旅比任何外在冒险都更广阔。",
        10:"灵性启示：命运之轮教导我们宇宙中唯一不变的就是变化本身。执着于高处会带来跌落的恐惧，执着于低处会带来绝望。真正的自由是成为轮心——那个不随外界起伏而动摇的中心点。无论生命带来什么，保持觉知和平静。你不是轮子上的乘客，你是那个观察轮子转动的意识。",
        11:"灵性启示：正义牌在灵性层面代表业力法则——不是奖惩，而是平衡。你播下的每一颗种子都会结果，你散发的每一份能量都会回到你身边。这不是为了让你恐惧，而是赋予你力量——因为这意味着你可以通过有意识的选择来创造你想要的现实。每一个善意的念头都在塑造更美好的未来。",
        12:"灵性启示：倒吊人代表灵性中最深奥的悖论——通过放弃获得，通过停止前进。他的姿态像是一棵倒长的树，根在天上。这提醒我们：也许我们对'进步'的理解完全是颠倒的。有时候灵魂需要的不是更多的行动和努力，而是完全的臣服和静止。在这种臣服中，一种全新的视角会自然浮现。",
        13:"灵性启示：死神是最被误解的牌。它不代表肉体的终结，而是意识的蜕变——旧的自我认同必须死去，更真实的自我才能诞生。每一次你放下一个限制性的信念，就经历了一次小小的'死亡'与重生。灵性成长的本质就是不断地死亡和重生——不断地放下已经不再服务你的东西，走向更完整的自己。",
        14:"灵性启示：节制是灵性炼金术的象征——将对立的元素融合成更高级的存在。火与水的融合创造出蒸汽(灵性)。在你的内在，理性与直觉、行动与静止、给予与接受都需要找到和谐的配比。节制教导'中道'——不是平庸的折中，而是在两极之间找到一个超越它们的第三种可能。",
        15:"灵性启示：恶魔牌揭示了灵性路上最大的障碍——无意识的模式和执着。那些'我不得不做'、'我控制不了'的信念本身就是锁链。恶魔邀请你面对自己最不愿意看到的部分——羞耻、恐惧、成瘾。当你有勇气在光中审视这些阴影，你会发现它们的力量急剧减弱。意识本身就是最强大的解放力量。",
        16:"灵性启示：塔的闪电是突然的觉醒——你一直相信为真的东西突然被证明是虚假的。虽然这个过程极其痛苦，但它是灵性成长中最有力的催化剂。每一次'塔的经历'都在邀请你建造一个更真实的生命。不是建在沙地上的华丽城堡，而是建在真相基石上的简朴居所。摧毁幻象的闪电，本质上是来自灵魂的慈悲。",
        17:"灵性启示：星星是灵魂最深的渴望——回归源头的宁静。在经历了塔的摧毁之后，灵魂赤裸地站在星空之下，终于放下了所有伪装和防御。这是最脆弱也最强大的时刻。星星的水流代表灵性能量无条件地流动——不需要资格，不需要证明，你本来就配得上宇宙的恩典。允许自己被疗愈，这本身就是一种勇气。",
        18:"灵性启示：月亮代表灵性道路上最困难的阶段——穿越潜意识的幽暗森林。在这个阶段，你会遇到自己最深的恐惧和最古老的伤痛。所有你以为已经处理好的创伤会重新浮现。月光下的道路蜿蜒曲折，你无法看到终点。但这正是信任的考验——在看不见路的时候继续走。每一步都在带你走向黎明。",
        19:"灵性启示：太阳代表灵性上的开悟体验——突然间，一切都清晰了。你看到生命的本质是喜悦，你的存在本身就是完美的。赤裸的孩子象征回归本初的天真——不是无知的天真，而是经历了整个旅程之后选择的天真。太阳不需要努力就能发光，你也是。当你停止试图成为某个人，你本来的光芒自然就会绽放。",
        20:"灵性启示：审判代表灵魂使命的觉醒——你突然清楚地知道自己为什么来到这个世界。这不是来自外部的声音，而是来自灵魂最深处的召唤。所有过去的经历——痛苦的和快乐的——都在这一刻被整合为完整的拼图。你终于看到了全貌。审判邀请你回应这个召唤，活出你灵魂真正的目的，而不只是安全地度过一生。",
        21:"灵性启示：世界代表灵性旅程的一个完整循环的结束。舞者的每一个动作都是完美的，因为她不再试图完美——她只是在存在。四大元素完全整合，内在与外在合一，个体与宇宙合一。但世界牌不是终点——月桂花环是开放的，暗示着更高维度的旅程即将开始。你毕业了，但学校有无限的年级。每一次完成都是新的开始。",
        22:"灵性启示：权杖王牌是最原始的创造之火——那个让宇宙从虚无中诞生的第一道火花。当这股能量流经你时，你会感到一种无法抑制的冲动：去创造、去表达、去开始。不要试图控制它或等到'准备好'，因为灵感之火稍纵即逝。你的灵魂在这一刻递给你一支火炬——接住它，然后奔跑。",
        23:"灵性启示：权杖二教导你站在选择的十字路口时，真正重要的不是选哪条路，而是你选择时的意识状态。如果你从恐惧出发，两条路都通向恐惧；如果你从内心的火焰出发，两条路都通向成长。握住你的愿景，像手握地球一样——轻柔但坚定。远方等待你的，比你能想象的更加辽阔。",
        24:"灵性启示：权杖三是你的创造开始在世界中扎根的时刻。灵魂的火花已经不再只是一个想法，它正在成为看得见的现实。这是一个从'我想要'到'我正在创造'的关键转变。不要在这个阶段回头，也不要满足于此——远方还有更广阔的海洋在等着你的船。扬帆的时刻已经到来。",
        25:"灵性启示：权杖四提醒你庆祝也是一种灵性修行。我们总是急于赶往下一个目标，忘记了停下来感恩已经走过的路。灵魂需要丰收节——一个承认自己已经走了多远的时刻。你建造的基础比你想象的更稳固，你创造的美好值得被庆祝。在感恩中休息，然后带着饱满的能量继续前行。",
        26:"灵性启示：权杖五的冲突不是应该被避免的问题，而是灵魂成长的熔炉。观点的碰撞像火花一样，在摩擦中创造新的可能性。不要害怕与他人不同，也不要害怕为你相信的事物而站出来。真正的和谐不是没有冲突，而是能够在冲突中保持尊重，并从中获得比任何一方单独拥有的更大的智慧。",
        27:"灵性启示：权杖六的胜利不是踩在别人之上的征服，而是内在品质被世界认可的时刻。你的光终于被看见了。这张牌提醒你，真正的荣耀来自于忠于自己的道路——不是为了掌声而走，而是因为这条路是真实的。享受被认可的喜悦，然后带着谦逊继续前行。荣耀不是终点，它是路上的风景。",
        28:"灵性启示：权杖七教导你关于信念的勇气——当所有人都质疑你的时候，你是否还相信自己？灵性道路上最孤独的时刻就是当你看到了别人看不到的真相，却不得不独自坚守。这不是固执，而是对内在真理的忠诚。不是每一场战斗都需要赢，但有些立场值得你拼尽全力。你的坚持会成为他人的灯塔。",
        29:"灵性启示：权杖八是宇宙对你说'是'的方式——当一切开始加速流动，不要踩刹车。这是灵性对齐的标志：你的意图、行动和宇宙的节奏完全同步了。在这种流动状态中，事情会毫不费力地发生。不要用怀疑打断这个流动，不要问'我配吗'。你配。信任这个速度，让它带你飞。",
        30:"灵性启示：权杖九教导关于坚韧的灵性课题：在最疲惫的时候坚持，不是因为你不累，而是因为你知道这条路的尽头有光。每一个伟大的灵魂都经历过这样的暗夜——所有的热情似乎已经燃尽，只剩下赤裸的意志。这就是考验。不是考验你的能力，而是考验你的信念。再坚持一步。就一步。",
        31:"灵性启示：权杖十是灵魂发出的紧急信号——你背负了不属于你的重量。在灵性上，我们常常不自觉地承担他人的情绪、期望和责任，直到自己被压垮。学会分辨哪些火把是你的使命，哪些只是别人递给你的负担。放下它们不是自私，而是对自己灵魂的尊重。你无法背着整个世界前行。",
        32:"灵性启示：权杖侍从是灵魂中那个永远保持好奇的孩子。他提醒你：灵性成长不需要沉重和严肃，它可以是一场充满惊奇的冒险。对每一个新想法说'有趣！'而不是'不可能'。让自己像初学者一样看待世界，因为当你以为自己什么都知道的时候，学习就停止了。保持这份天真的火焰。",
        33:"灵性启示：权杖骑士是灵魂中不可驯服的野性力量——那股让你想要打破一切限制、全速奔跑的冲动。这种能量是神圣的，不要压抑它。但也要记住，一匹脱缰的马只是在奔跑，一匹有方向的马才是在前进。将你的热情导向一个值得的目标，你会成为势不可挡的力量。激情加上方向等于使命。",
        34:"灵性启示：权杖王后的火焰是温暖而非灼伤的。她教导你如何在保持热情的同时不烧伤自己和他人。真正的自信不需要证明什么——它像太阳一样自然地散发光和热。你的存在本身就是一种力量。不要缩小自己来让别人舒适，也不要膨胀自己来让别人仰望。只是做你自己——那已经足够耀眼。",
        35:"灵性启示：权杖国王掌握了将灵感转化为现实的终极艺术。他的灵性教导是：愿景不够，行动不够，你需要将两者完美融合。他看到了远方的火焰，也知道脚下的每一步该怎么走。在你的灵性道路上，成为这样的国王——既能仰望星空，又能脚踏实地。用你的愿景激励他人，用你的行动证明它。",
        36:"灵性启示：圣杯王牌是灵魂最纯粹的爱——不是来自另一个人的爱，而是来自源头的爱直接流入你的心。这份爱不需要你做任何事来换取，它无条件地涌向你。唯一需要做的就是打开你的心去接受。当你能够接受这份无条件的爱时，你自然会成为爱的管道，让它流向你生命中的每一个人。",
        37:"灵性启示：圣杯二的灵性教导是关于'镜像'——你在他人身上看到的，都是你自己的某个面向。深刻的连接之所以深刻，是因为另一个灵魂映照出了你最真实的部分。不要去外面寻找你的另一半，因为你已经是完整的。当两个完整的灵魂相遇，创造的不是依赖，而是一加一大于二的炼金术。",
        38:"灵性启示：圣杯三提醒你灵性不是一个人的孤独修行——我们是通过与他人的真诚连接来体验神圣的。每一次真心的欢笑、每一次深入的分享、每一次无条件的陪伴，都是灵性的高峰体验。不要把灵性和日常生活分开，你和朋友共饮的那杯茶里，和你在冥想中感受到的宁静是同一种神圣。",
        39:"灵性启示：圣杯四是灵魂的倦怠期——你对一切都提不起兴趣，觉得生活失去了色彩。这其实是灵魂在说：你一直在从外部寻找满足感，但那口井已经干了。真正的甘泉在你内心。这种无聊和冷漠不是终点，而是一个转折点——从外求转向内求的关键时刻。抬起头，那个被你忽视的新杯子里装满了活水。",
        40:"灵性启示：圣杯五是灵魂的悲伤功课——不是要你停止悲伤，而是教你如何在悲伤中找到智慧。被打翻的杯子代表你失去的东西，但身后还有满满的杯子代表你仍然拥有的。悲伤是爱的另一面——你之所以痛，是因为你深深地在乎过。允许自己去悲伤，但也别忘了转身。你还有这么多值得珍惜的。",
        41:"灵性启示：圣杯六的怀旧不只是对过去的留恋，它是灵魂在提醒你：你的过去不是一堆需要疗愈的创伤，它也包含了纯真、美好和爱。重新连接童年时那个未受伤的自己——那个相信魔法、相信善良、相信一切皆有可能的孩子。他没有消失，他还在你心里，等你回来找他。内在小孩的疗愈从拥抱记忆开始。",
        42:"灵性启示：圣杯七揭示了灵性路上最大的陷阱——幻象。我们很容易被美丽的灵性概念、令人陶醉的体验和华丽的愿景所迷惑，以至于忘了脚下的大地。不是每一个闪闪发光的东西都是真金。学会分辨哪些是灵魂真正的召唤，哪些只是ego包装过的欲望。用心去感受，而不是用眼睛去看。",
        43:"灵性启示：圣杯八是灵魂最勇敢的选择之一——放弃看似完好的一切，去寻找更深层的真实。世俗的眼光会说你疯了，但你的灵魂知道：如果你在'完美'的生活中感到空洞，那个空洞就是灵魂的信号。有些旅程必须独自开始，有些东西必须放下才能找到。月光下离去的身影不是逃避，是朝圣。",
        44:"灵性启示：圣杯九是灵魂的满足——不是'我得到了想要的一切'的满足，而是'我感恩我已经拥有的一切'的满足。这两种满足有天壤之别。前者永远不够，后者当下即是。真正的愿望成真不是宇宙给了你什么，而是你终于看见了宇宙已经给你的一切。当你能够在此刻说'够了'，你就拥有了一切。",
        45:"灵性启示：圣杯十是灵魂最深层的渴望——归属、连接、和永恒的爱。彩虹是灵魂与宇宙的盟约：你是被爱着的，你永远属于一个更大的家庭。这不仅仅是人间的家庭，更是灵魂的家族。你在这个世界上不是孤独的漂泊者——每一个真心爱过你的灵魂，无论在哪里，都与你永远相连。爱是唯一不死的东西。",
        46:"灵性启示：圣杯侍从代表灵魂中那个纯真的感受者——他不分析情感，只是完全地去体验它。在我们成长的过程中，我们学会了压抑感受、理性分析情绪、控制表达。但灵魂渴望回到那种纯粹的感受——被美打动到流泪，被爱触碰到颤抖。允许自己像孩子一样去感受，这不是脆弱，而是勇敢。",
        47:"灵性启示：圣杯骑士是灵魂中那个为理想不顾一切的浪漫主义者。他教导我们：在一个越来越务实的世界里，敢于为了爱、为了美、为了理想而行动，本身就是一种灵性的反抗。不要让世界的冷漠冻住你的热情。追随你心中那个不切实际的梦想——因为灵魂从来不讲'实际'，它只讲'真实'。",
        48:"灵性启示：圣杯王后拥有最深的共情能力——她能感受到他人的痛苦，也能感受到他人的喜悦。这是一种灵性天赋，但也是一种需要保护的能力。她教导你：你可以深深地感受，但不需要承担他人的情绪。像水一样——让情感流过你，但不要让它们在你身上形成淤塞。你的敏感是灵魂的触角，不是你的弱点。",
        49:"灵性启示：圣杯国王精通情感的艺术——他能深深感受，也能智慧地引导情感的流向。他的灵性教导是：成熟不是不再感受，而是能够在感受的海洋中保持清醒。你可以悲伤却不被悲伤淹没，你可以愤怒却不被愤怒控制。掌握了这种能力的人，既是深情的爱人，也是冷静的智者。两者可以共存。",
        50:"灵性启示：宝剑王牌是意识的闪电——突然间，你看清了一直困扰你的问题的本质。这种清晰可能来得很突然，甚至有些残忍，因为真相不总是温柔的。但每一次与真相的相遇，都是灵魂的解放。不要害怕看到不舒服的事实——正是那些不舒服的真相，拥有最大的解放力量。真相可能伤人，但谎言会杀人。",
        51:"灵性启示：宝剑二的僵局是头脑自己创造的牢笼。你的理性在两个选项之间无限循环，越分析越困惑。蒙住眼睛不是无知，而是一种选择——暂时关闭头脑的分析，回到心的感受。有些决定不能用思考来解决，因为两个选项在逻辑上同样合理。当头脑僵住时，让心来做决定——它早就知道答案了。",
        52:"灵性启示：宝剑三是灵魂最直接的痛苦体验——没有任何缓冲和修饰。但这种痛苦本身带着疗愈的种子。当你允许一把剑完全穿透你的心，而不是试图闪避或假装不痛时，一些奇迹般的事情会发生——痛苦会穿过你，而不是困在你的身体里。完全去感受它，然后它就能完全地离开。压抑的悲伤才会永远留下。",
        53:"灵性启示：宝剑四是灵魂的神圣暂停。在这个永远在运转的世界里，停下来本身就是一种革命性的行为。你的头脑需要定期关机重启——就像电脑一样。在深度的静止中，被搅乱的水会自然澄清，纷乱的思绪会自然沉淀。不要觉得'什么都不做'是在浪费时间——有时候，什么都不做正是灵魂最需要你做的事。",
        54:"灵性启示：宝剑五揭示了一个痛苦的真相：在争执中'赢'了的人往往是真正的输家。当你击败了你爱的人、你的朋友、你的同事——你赢得了论点，却可能失去了关系。灵魂的智慧是知道哪些战斗值得打，哪些胜利的代价太高。有时候最有力量的事是放下武器说：'你说得对，我理解你。'",
        55:"灵性启示：宝剑六是灵魂从困境走向平静的过渡之旅。这段旅程可能不舒适——你正在离开熟悉的痛苦，驶向未知的平静。是的，痛苦也可以变得'熟悉'和'舒适'。离开它需要勇气。水面从波涛到平静的变化提醒你：你正在走向对的方向。即使现在感到迷茫和不确定，请继续向前。更平静的水域就在前方。",
        56:"灵性启示：宝剑七教导你关于策略和正直之间微妙的平衡。有时候正面对抗不是最好的选择，迂回的智慧也是一种力量。但这里有一条灵性的红线——你使用的手段必须配得上你追求的目的。如果你用欺骗来追求真相，用伤害来追求和平，那么你已经输了。保持手段的清白，即使这意味着更慢、更难。",
        57:"灵性启示：宝剑八是灵魂最重要的领悟之一——大多数限制你的东西并不是真正的牢笼，而是你头脑中的信念。'我不够好'、'我做不到'、'我不配'——这些想法像绳索一样绑住你，但它们只是想法。而想法是可以改变的。蒙住你眼睛的布是你自己围上去的，你也随时可以摘下来。自由近在咫尺。",
        58:"灵性启示：宝剑九是凌晨三点的灵魂暗夜——当恐惧在黑暗中变得比现实大一百倍。你头脑中的灾难预演几乎总是比实际发生的事情更可怕。这张牌教导你分辨'真实的危险'和'想象中的危险'。大多数让你夜不能寐的事情永远不会发生。天亮之后，你会发现昨晚那些可怕的阴影只不过是一件椅子上的外套。",
        59:"灵性启示：宝剑十是灵魂的最低谷——但这正是它的力量所在。当你彻底倒下的时候，一个奇妙的事情发生了：你不需要再害怕跌倒了，因为你已经在地面上了。这是一种彻底的解放。从这里开始，每一步都是向上的。最深的创伤往往带来最深的觉醒。在灵魂的语言中，结束和开始是同一个词。",
        60:"灵性启示：宝剑侍从代表灵魂中对真理永不满足的求知欲。他像一把新磨的剑，锋利而急切。这种对真相的渴望是灵性成长的强大动力——永远不要停止提问，永远不要满足于现成的答案。但也要记住，知识和智慧是不同的。知识是剑的锋利，智慧是知道何时出鞘、何时收剑。先磨剑，再学剑法。",
        61:"灵性启示：宝剑骑士是思维的极速战士——他的反应快如闪电，言辞锋利如刀。这种头脑的力量是双刃剑：它能快速切中问题的核心，也能无意间伤害到身边的人。灵魂的功课是学会在保持敏锐的同时培养温柔。在你说出口之前停一秒钟，问自己：这句话是必要的吗？是真实的吗？是善意的吗？速度不代表一切，方向比速度更重要。",
        62:"灵性启示：宝剑王后是经历了苦难之后依然选择清醒和独立的灵魂。她的冷静不是冷漠——她感受一切，但不再被感受支配。她的剑指向天空，代表她用清晰的头脑为真相服务。她教导你：你可以一个人站立，而不是孤独地站立。坚强和温柔可以共存——你不需要在保护自己和敞开心扉之间选择，你可以同时做到。",
        63:"灵性启示：宝剑国王代表思维修炼的最高成就——一颗既锋利又慈悲的心智。他可以看穿所有的幻象，但他选择用这份清醒来服务而非审判。在灵性道路上，智识能力是一把强大的工具，但如果失去了心的温度，它就会变成冰冷的牢笼。真正的智者不是什么都看透了的人，而是看透了一切却依然选择爱的人。",
        64:"灵性启示：星币王牌是宇宙递给你的一枚种子——它代表一切物质丰盛的起点。但种子需要种进土里才会发芽。灵性和物质不是对立的——你的灵魂选择来到物质世界，就是为了体验创造的喜悦。金钱、健康、舒适的生活都是灵性的表达。接受这枚金币，把它种进勤劳和感恩的土壤里，然后看它长成一棵大树。",
        65:"灵性启示：星币二教导你生命的动态平衡——不是静止不动的天平，而是杂技演员手中不断调整的球。工作和休息、给予和接受、物质和灵性、严肃和玩乐——你不需要在它们之间选择，而是要学会让它们像舞蹈一样轮流旋转。当你觉得某个方面失控时，不要抓紧，要放松——灵活的柳树比僵硬的橡树更能抵御风暴。",
        66:"灵性启示：星币三是将灵魂的蓝图交给双手的时刻——你的想法需要通过实际的技艺来实现。在灵性修行中，我们往往过于关注内在世界而忽视了手艺的重要性。但神圣就藏在细节里——一个工匠对每一毫米的专注，和一个修行者在冥想中的专注是同一种能量。精益求精本身就是一种灵修。做好手中的每一件小事。",
        67:"灵性启示：星币四揭示了我们与物质世界最深的恐惧——失去。当你紧紧抓住已经拥有的东西时，你的手就无法接受新的礼物。灵性的丰盛来自于信任——信任宇宙会持续供给你，信任你值得拥有，信任失去的东西会以更好的形式回来。松开你的拳头，你会发现手心里的东西并没有飞走，反而有更多的东西落了进来。",
        68:"灵性启示：星币五是灵魂的匮乏体验——它不仅仅是物质上的贫困，更是一种'不够'的深层信念。这张牌邀请你审视：你真的什么都没有了吗？还是恐惧让你看不到身边的资源？风雪中的教堂之窗透着温暖的光——帮助就在你身边，但你需要放下骄傲或羞耻去接受它。请求帮助不是软弱，而是智慧。你值得被帮助。",
        69:"灵性启示：星币六的给予和接受是宇宙能量流动的基本法则。就像呼吸一样——只吸不呼会窒息，只呼不吸也会窒息。慷慨地给予时，你打开了接受的通道；感恩地接受时，你完成了给予的循环。灵性的丰盛不是囤积，而是流动。像河流一样——水之所以保持清新，是因为它不断地流动。让你的爱和资源也这样流动。",
        70:"灵性启示：星币七教导灵性中最容易被忽视的美德——耐心。在一个追求即时满足的时代，你愿意等待种子在黑暗的泥土中慢慢发芽吗？灵魂的成长和庄稼一样，有它自己的季节。你无法通过拔苗来助长。信任时间的力量，做好你该做的——浇水、除草、等待。你看不到的地方，根正在向更深处延伸。收获会来的。",
        71:"灵性启示：星币八是灵魂的工匠精神——通过日复一日的练习，将粗糙的石头雕琢成精美的艺术品。而那块石头就是你自己。灵性修行不是一次戏剧性的顿悟，而是每天清晨的冥想、每一次有意识的呼吸、每一个善意的选择。水滴石穿不是水的力量，而是重复的力量。你正在一刀一刀地雕刻自己的灵魂，不要急。",
        72:"灵性启示：星币九是灵魂的丰收季——你终于可以站在自己亲手创造的花园中，感受富足和自信。这种丰盛不是来自运气，而是来自你一步一步的积累。灵性上的'独立'不是不需要任何人，而是即使只有你自己，你也能活出美丽和尊严。你就是自己最好的伴侣，你就是自己最可靠的源泉。优雅地站在你的花园中吧。",
        73:"灵性启示：星币十是灵魂的传承——你创造的一切不仅属于你，它会流传给后来的人。每一个善意的举动都会像涟漪一样扩散到你看不见的地方。你的爱、智慧和善良会通过你的孩子、学生、朋友继续活在这个世界上。你比你以为的更重要——你是一根链条上不可替代的一环，连接着过去和未来。好好活着就是最好的传承。",
        74:"灵性启示：星币侍从代表灵魂中那个脚踏实地的学习者。他不追求华丽的灵性体验，而是认认真真地从基础开始。每一个大师都曾经是初学者，每一棵大树都曾经是一粒种子。不要因为自己是新手而感到羞愧，也不要因为进步缓慢而沮丧。你手中的这枚金币就是你的起点——小小的，但充满了潜能。珍惜它，培育它。",
        75:"灵性启示：星币骑士是灵魂中最稳定可靠的力量。在一个崇尚速度和变化的时代，他提醒你：慢下来不是落后，稳定不是无趣。真正的力量不在于跑得多快，而在于能够日复一日地走在正确的道路上。灵性修行最需要的不是天赋，而是毅力。像这位骑士一样——也许不是最耀眼的，但一定是最可信赖的。坚持就是力量。",
        76:"灵性启示：星币王后是灵魂中最温暖的滋养者——她知道如何在照顾他人的同时照顾好自己。这是一门很多人一辈子都在学习的功课。她的花园之所以繁茂，不是因为她把所有精力都给了花草，而是因为她首先给了自己充足的阳光和水。一个枯竭的给予者无法真正给予。请记住：你不是水壶，你是泉眼。先让自己充盈。",
        77:"灵性启示：星币国王是灵魂的大地之王——他掌握了物质世界的规律，并用这种掌握来服务更高的目的。他的终极教导是：真正的富有不是拥有最多的人，而是能够自由选择用时间做什么的人。当你不再被金钱驱使，而是让金钱为你的灵魂目标服务时，你就成为了真正的国王。财富是工具，自由才是目的，爱才是意义。"
    };
    return data[id] || '';
}
   
// ===== 是非占卜 =====
function startYesNo(){
    document.getElementById('yesnoResult').style.display='none';
    document.getElementById('yesnoResult').innerHTML='';
    document.getElementById('yesnoAction').innerHTML='<button class="action-btn" onclick="closeYesNo()">取消</button><button class="action-btn primary" onclick="doYesNo()">✦ 抽牌 ✦</button>';
    document.getElementById('yesnoModal').classList.add('active');
}
function closeYesNo(){document.getElementById('yesnoModal').classList.remove('active');}
function doYesNo(){
    var pool=allCards;
    var card=pool[Math.floor(Math.random()*pool.length)];
    var isRev=Math.random()<0.5;

    // 所有78张牌的是非倾向分数 (-2到+2)
    var yesNoScores={
        // 大阿卡纳
        0:1, 1:2, 2:0, 3:2, 4:1, 5:1, 6:2, 7:2, 8:2, 9:0,
        10:1, 11:1, 12:0, 13:-1, 14:1, 15:-2, 16:-2, 17:2, 18:-1, 19:2,
        20:1, 21:2,
        // 权杖 (22-35)
        22:2, 23:1, 24:1, 25:2, 26:0, 27:2, 28:1, 29:1, 30:0, 31:-1,
        32:1, 33:1, 34:1, 35:2,
        // 圣杯 (36-49)
        36:2, 37:2, 38:2, 39:-1, 40:-1, 41:0, 42:-1, 43:-1, 44:2, 45:2,
        46:1, 47:1, 48:1, 49:1,
        // 宝剑 (50-63)
        50:1, 51:0, 52:-2, 53:0, 54:-1, 55:1, 56:0, 57:-1, 58:-2, 59:-2,
        60:1, 61:1, 62:0, 63:1,
        // 星币 (64-77)
        64:2, 65:1, 66:1, 67:0, 68:-1, 69:1, 70:1, 71:1, 72:2, 73:2,
        74:1, 75:1, 76:1, 77:2
    };

    // 获取基础分数
    var baseScore = yesNoScores[card.id] !== undefined ? yesNoScores[card.id] : 0;

    // 逆位翻转分数
    var score;
    if(isRev){
        score = -baseScore;
        // 原本中性的逆位稍偏否
        if(baseScore === 0) score = -1;
    } else {
        score = baseScore;
    }

    var answer, aClass, stars, confidence;
    if(score >= 2){
        answer='✦ 命运倾向于：是 ✦'; aClass='yes'; stars='★★★★★'; confidence='非常强烈';
    } else if(score === 1){
        answer='✦ 倾向于：是 ✦'; aClass='yes'; stars='★★★★☆'; confidence='较为明确';
    } else if(score === 0){
        answer='✦ 结果尚不明朗 ✦'; aClass='maybe'; stars='★★★☆☆'; confidence='不够明确';
    } else if(score === -1){
        answer='✦ 倾向于：否 ✦'; aClass='no'; stars='★★★★☆'; confidence='较为明确';
    } else {
        answer='✦ 命运倾向于：否 ✦'; aClass='no'; stars='★★★★★'; confidence='非常强烈';
    }

    var desc = isRev ? card.reversedDesc : card.uprightDesc;
    var imgUrl = getCardImageUrl(card.id);
    var resultEl = document.getElementById('yesnoResult');
    resultEl.style.display = 'block';
    resultEl.innerHTML = '<div class="yesno-answer '+aClass+'">'+answer+'</div>'+
        '<div class="yesno-card-info">'+
            '<div class="yesno-card-thumb" id="yesnoThumb"></div>'+
            '<div class="yesno-card-text">'+
                '<div class="yesno-card-name">'+card.name+' · '+card.en+'</div>'+
                '<div class="yesno-card-orient '+(isRev?'reversed':'upright')+'">'+(isRev?'逆位 ↓':'正位 ↑')+'</div>'+
            '</div>'+
        '</div>'+
        '<div class="yesno-msg">'+desc+'</div>'+
        (card.advice?'<div class="yesno-msg" style="color:var(--gold);opacity:0.7;">✧ '+card.advice+'</div>':'')+
        '<div class="yesno-confidence">'+confidence+' · '+stars+'</div>';

    // 用缓存系统加载图片
    var thumbEl = document.getElementById('yesnoThumb');
    if(thumbEl && typeof fillCardImg === 'function'){
        fillCardImg(thumbEl, card.id);
    }

    document.getElementById('yesnoAction').innerHTML =
        '<button class="action-btn" onclick="closeYesNo()">关闭</button>'+
        '<button class="action-btn primary" onclick="doYesNo()">再问一次 ↻</button>';
    playSfx('flip');
}
const threeSubTypes = [
    { key:'time',   name:'时间之流', icon:'⏳', meanings:['过去','现在','未来'],     desc:'时间线上的三个切面' },
    { key:'bms',    name:'身心灵',   icon:'🧠', meanings:['身体','心智','灵魂'],     desc:'探索自我的三个维度' },
    { key:'sao',    name:'境·动·果', icon:'🎯', meanings:['处境','行动','结果'],     desc:'从现状到行动的指引' },
    { key:'swot',   name:'明暗灯',   icon:'💡', meanings:['优势','劣势','建议'],     desc:'认清自身的光与影' },
    { key:'choice', name:'抉择之秤', icon:'⚖️', meanings:['选项A','选项B','建议'],   desc:'面对二选一的困境' },
    { key:'cause',  name:'因果镜',   icon:'🔮', meanings:['起因','经过','结果'],     desc:'追溯事件的因果脉络' }
];
function showThreeSubMenu(){
    var grid=document.getElementById('threeSubGrid');
    grid.innerHTML=threeSubTypes.map(function(t){
        return '<div class="three-sub-item" onclick="startThreeReading(\''+t.key+'\')">'+
            '<div class="sub-icon">'+t.icon+'</div>'+
            '<div class="sub-name">'+t.name+'</div>'+
            '<div class="sub-meanings">'+t.meanings.join(' · ')+'</div>'+
            '<div class="sub-desc">'+t.desc+'</div></div>';
    }).join('');
    document.getElementById('threeSubModal').classList.add('active');
}
function closeThreeSubModal(){document.getElementById('threeSubModal').classList.remove('active');}
function startThreeReading(subKey){
    closeThreeSubModal();
    var sub=threeSubTypes.find(function(t){return t.key===subKey;});
    spreads.three.meanings=sub.meanings;
    spreads.three.name='三象之镜 · '+sub.name;
    startReading('three');
}
function startReading(type){
    currentSpread=spreads[type];shuffled=false;drawIdx=0;drawn=[];resetAIChat();
    deck=(deckType==='major'?[...majorArcana]:[...allCards]).map(c=>({...c,isReversed:Math.random()<0.5}));
    shuffleArray(deck);
    document.getElementById('homePage').classList.add('hidden');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('readingPage').classList.add('active');
    document.getElementById('readingPage').classList.add('page-enter');
    document.getElementById('readingTitle').textContent=currentSpread.name;
    document.getElementById('readingSubtitle').textContent=`${deckType==='major'?'大阿卡纳 · 22张':'全牌 · 78张'} · 抽取 ${currentSpread.count} 张`;
    document.getElementById('shuffleHint').textContent='点击洗牌，准备好后从弧形牌中选取';
    document.getElementById('drawProgress').textContent='';
    document.getElementById('actionBar').classList.remove('visible');
    document.getElementById('interpArea').classList.remove('visible');
    document.getElementById('interpArea').innerHTML='';
    buildFan();buildSpread();
}
// ===== 牌阵手指旋转 =====
var fanRotation = 0;
var fanJustRotated = false;
var fanIsDragging = false;
var fanLastAngle = 0;
var fanVelocity = 0;
var fanAnimId = null;
var fanDragStartTime = 0;
var fanDragStartAngle = 0;
var fanTotalDragAngle = 0;
var fanContainerEl = null;
var fanCenterX = 0;
var fanCenterY = 0;

function fanGetAngle(x, y) {
    return Math.atan2(y - fanCenterY, x - fanCenterX);
}

function fanUpdateCards() {
    var ct = document.getElementById('fanContainer');
    if (!ct) return;
    var cards = ct.querySelectorAll('.fan-card');
    var total = cards.length;
    if (total === 0) return;
    var size = ct.offsetWidth;
    var cardW = size * 0.131, cardH = size * 0.21;
    var centerX = size / 2, centerY = size / 2;
    var radius = (size - cardH) / 2 - 10;

    for (var i = 0; i < total; i++) {
        var baseAngle = (Math.PI * 2 * i / total) - Math.PI / 2;
        var angle = baseAngle + fanRotation;
        var x = centerX + Math.cos(angle) * radius - cardW / 2;
        var y = centerY + Math.sin(angle) * radius - cardH / 2;
        var rot = (angle * 180 / Math.PI) + 90;
        var tf = 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg)';
        cards[i].style.setProperty('--fan-transform', tf);
        if (!cards[i].classList.contains('drawn')) {
            cards[i].style.transform = tf;
        }
        cards[i].style.zIndex = Math.round(Math.cos(angle) * 50 + 50);
    }
}

function fanInertia() {
    if (Math.abs(fanVelocity) < 0.0003) {
        fanVelocity = 0;
        var ct = document.getElementById('fanContainer');
        if (ct) ct.classList.remove('spinning');
        return;
    }
    fanRotation += fanVelocity;
    fanVelocity *= 0.95;
    fanUpdateCards();
    fanAnimId = requestAnimationFrame(fanInertia);
}

function fanOnStart(e) {
    var ct = document.getElementById('fanContainer');
    if (!ct) return;
    // 不要 preventDefault，让浏览器正常处理缩放等
    if (fanAnimId) { cancelAnimationFrame(fanAnimId); fanAnimId = null; }
    var rect = ct.getBoundingClientRect();
    fanCenterX = rect.left + rect.width / 2;
    fanCenterY = rect.top + rect.height / 2;
    var touch = e.touches ? e.touches[0] : e;
    // 多指触控（缩放）不处理
    if (e.touches && e.touches.length > 1) return;
    fanLastAngle = fanGetAngle(touch.clientX, touch.clientY);
    fanDragStartAngle = fanLastAngle;
    fanDragStartTime = Date.now();
    fanTotalDragAngle = 0;
    fanIsDragging = true;
    fanVelocity = 0;
}

function fanOnMove(e) {
    if (!fanIsDragging) return;
    if (e.touches && e.touches.length > 1) { fanIsDragging = false; return; }
    var touch = e.touches ? e.touches[0] : e;
    var currentAngle = fanGetAngle(touch.clientX, touch.clientY);
    var delta = currentAngle - fanLastAngle;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    // 只有滑动幅度够大才开始旋转，防止误触
    if (fanTotalDragAngle < 0.03 && Math.abs(delta) < 0.01) return;
    // 开始真正旋转时才阻止默认行为
    if (fanTotalDragAngle > 0.03 && e.cancelable) {
        e.preventDefault();
    }
    var ct = document.getElementById('fanContainer');
    if (ct && !ct.classList.contains('spinning')) ct.classList.add('spinning');
    fanRotation += delta;
    fanTotalDragAngle += Math.abs(delta);
    fanVelocity = delta;
    fanLastAngle = currentAngle;
    fanUpdateCards();
}

function fanOnEnd(e) {
    if (!fanIsDragging) return;
    fanIsDragging = false;
    var ct = document.getElementById('fanContainer');
    if (fanTotalDragAngle < 0.05) {
        if (ct) ct.classList.remove('spinning');
        return;
    }
    // 标记刚刚在旋转，防止误触发点击
    fanJustRotated = true;
    setTimeout(function(){ fanJustRotated = false; }, 300);
    var elapsed = Date.now() - fanDragStartTime;
    if (elapsed < 300) {
        fanVelocity *= 1.5;
    }
    fanAnimId = requestAnimationFrame(fanInertia);
}
function initFanTouch() {
    var ct = document.getElementById('fanContainer');
    if (!ct) return;
    // 移除旧的事件（防止重复绑定）
    ct.removeEventListener('touchstart', fanOnStart);
    ct.removeEventListener('touchmove', fanOnMove);
    ct.removeEventListener('touchend', fanOnEnd);
    ct.removeEventListener('touchcancel', fanOnEnd);
    ct.removeEventListener('mousedown', fanOnStart);
    // 重新绑定
    ct.addEventListener('touchstart', fanOnStart, { passive: true });
    ct.addEventListener('touchmove', fanOnMove, { passive: false });
    ct.addEventListener('touchend', fanOnEnd);
    ct.addEventListener('touchcancel', fanOnEnd);
    ct.addEventListener('mousedown', fanOnStart);
    window.addEventListener('mousemove', fanOnMove);
    window.addEventListener('mouseup', fanOnEnd);
}
function buildFan(){
    fanRotation = 0;
    fanVelocity = 0;
    if (fanAnimId) { cancelAnimationFrame(fanAnimId); fanAnimId = null; }

    var ct = document.getElementById('fanContainer');
    ct.innerHTML = '';
    var total = Math.min(deck.length, 40);
    var size = Math.min(420, window.innerWidth * 0.9);
    var cardW = size * 0.131, cardH = size * 0.21;
    var centerX = size / 2, centerY = size / 2;
    var radius = (size - cardH) / 2 - 10;
    ct.style.width = size + 'px';
    ct.style.height = size + 'px';
    ct.innerHTML = '<div class="circle-center-text"><span class="big">☽</span><span class="small">滑动旋转 · 点击选牌</span></div>';

    for (var i = 0; i < total; i++) {
        var angle = (Math.PI * 2 * i / total) - Math.PI / 2;
        var x = centerX + Math.cos(angle) * radius - cardW / 2;
        var y = centerY + Math.sin(angle) * radius - cardH / 2;
        var rot = (angle * 180 / Math.PI) + 90;
        var card = document.createElement('div');
        card.className = 'fan-card';
        card.setAttribute('data-fan-index', i);
        var tf = 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg)';
        card.style.setProperty('--fan-transform', tf);
        card.style.transform = tf;
        card.style.zIndex = i < total / 2 ? i + 1 : total - i + 1;
        var cvs = document.createElement('canvas');
        drawCardBack(cvs, 110, 176);
        card.appendChild(cvs);
        card.addEventListener('click', (function(idx) {
            return function() { onFanCardClick(idx); };
        })(i));
        ct.appendChild(card);
    }

    initFanTouch();
}
function doShuffle(){
    deck=deck.map(c=>({...c,isReversed:Math.random()<0.5}));shuffleArray(deck);
    shuffled=true;drawIdx=0;drawn=[];playSfx('shuffle');
    document.querySelectorAll('.tarot-slot').forEach(s=>{s.classList.remove('flipped','reversed');s.classList.add('empty');});
    document.getElementById('actionBar').classList.remove('visible');
    document.getElementById('interpArea').classList.remove('visible');
    document.querySelectorAll('.fan-card').forEach(c=>{c.classList.remove('drawn');c.classList.add('shuffling-anim');});
    setTimeout(()=>document.querySelectorAll('.fan-card').forEach(c=>c.classList.remove('shuffling-anim')),800);
    document.getElementById('shuffleHint').textContent='已洗牌！从弧形牌中选择你感应到的牌';updateProgress();
}
function onFanCardClick(fi){
    if(fanJustRotated) return;
    if(!shuffled){doShuffle();return;}if(drawIdx>=currentSpread.count)return;
    const fc=document.querySelector(`.fan-card[data-fan-index="${fi}"]`);if(fc.classList.contains('drawn'))return;fc.classList.add('drawn');
    const card=deck[drawIdx],si=drawIdx;drawn.push({...card,position:currentSpread.meanings[si]});
    const slot=document.querySelector(`.tarot-slot[data-slot="${si}"]`);
    if(slot){
        slot.classList.remove('empty');
        const front=slot.querySelector('.tarot-front');
        const ic=front.querySelector('.card-img-container');
        const title=front.querySelector('.card-title');
        const orient=front.querySelector('.card-orient');

       fillCardImg(ic, card.id);
        title.textContent=card.name;
        orient.textContent=card.isReversed?'逆位 ↓':'正位 ↑';
        orient.className='card-orient '+(card.isReversed?'reversed':'upright');
        if(card.isReversed)slot.classList.add('reversed');
        setTimeout(function(){
            slot.querySelector('.tarot-inner').offsetHeight;
            slot.classList.add('flipped');playSfx('flip');
            // 粒子爆发效果
            var pe=document.createElement('div');pe.className='flip-particles';
    slot.appendChild(pe);
    for(var p=0;p<12;p++){
        var dot=document.createElement('div');dot.className='flip-particle';
        var angle=Math.PI*2*p/12;
        var dist=30+Math.random()*40;
        dot.style.setProperty('--px',Math.cos(angle)*dist+'px');
        dot.style.setProperty('--py',Math.sin(angle)*dist+'px');
        dot.style.background='hsl('+(40+Math.random()*20)+',80%,'+(60+Math.random()*30)+'%)';
        dot.style.animationDelay=Math.random()*0.15+'s';
        pe.appendChild(dot);
    }
    setTimeout(function(){pe.remove();},1000);
},300);
    }
    drawIdx++;updateProgress();
    if(drawIdx>=currentSpread.count)setTimeout(()=>{document.getElementById('actionBar').classList.add('visible');playSfx('complete');},1000);
}
function updateProgress(){const e=document.getElementById('drawProgress');if(!shuffled){e.textContent='';return;}e.textContent=`${Math.min(drawIdx,currentSpread.count)} / ${currentSpread.count}`;}

function buildSpread(){
    const ct=document.getElementById('spreadContainer');ct.innerHTML='';const ly=currentSpread.layout;
    const wr=document.createElement('div');wr.className=`spread-${ly}`;
    for(let i=0;i<currentSpread.count;i++){
        const sw=document.createElement('div');sw.className='tarot-slot-wrapper';
        const sl=document.createElement('div');sl.className='tarot-slot empty';sl.setAttribute('data-slot',i);
        if(ly==='cross'||ly==='celtic'||ly==='hexagram')sl.classList.add(`slot-${i}`);
        sl.innerHTML=`<div class="tarot-inner"><div class="tarot-face tarot-back"><div class="tarot-back-inner"><span class="sym">✦</span><span class="pos-label">${currentSpread.meanings[i]}</span></div></div><div class="tarot-face tarot-front"><div class="card-img-container"></div><div class="card-title"></div><div class="card-orient"></div></div></div>`;
        if(ly==='hexagram'||ly==='celtic'||ly==='cross'){sl.classList.add(`slot-${i}`);wr.appendChild(sl);}
        else if(ly==='relationship'){sw.appendChild(sl);const ml=document.createElement('div');ml.className='slot-meaning-label';ml.textContent=currentSpread.meanings[i];sw.appendChild(ml);
    if(i<=1){let r=wr.querySelector('.row-top');if(!r){r=document.createElement('div');r.className='row row-top';wr.appendChild(r);}r.appendChild(sw);}
    else if(i===2){let r=document.createElement('div');r.className='row row-mid';wr.appendChild(r);r.appendChild(sw);}
    else{let r=wr.querySelector('.row-bot');if(!r){r=document.createElement('div');r.className='row row-bot';wr.appendChild(r);}r.appendChild(sw);}}
        else{sw.appendChild(sl);const ml=document.createElement('div');ml.className='slot-meaning-label';ml.textContent=currentSpread.meanings[i];sw.appendChild(ml);wr.appendChild(sw);}
    }ct.appendChild(wr);
}
function resetReading(){
    shuffled=false;drawIdx=0;drawn=[];resetAIChat();
    deck=(deckType==='major'?[...majorArcana]:[...allCards]).map(c=>({...c,isReversed:Math.random()<0.5}));shuffleArray(deck);
    document.querySelectorAll('.tarot-slot').forEach(s=>{s.classList.remove('flipped','reversed');s.classList.add('empty');});
    document.getElementById('actionBar').classList.remove('visible');document.getElementById('interpArea').classList.remove('visible');
    document.getElementById('interpArea').innerHTML='';document.getElementById('drawProgress').textContent='';
    document.getElementById('shuffleHint').textContent='点击洗牌，准备好后从弧形牌中选取';buildFan();buildSpread();
}

// ===== INTERPRETATION =====
function showInterp(){
    const area=document.getElementById('interpArea');area.classList.add('visible');area.innerHTML='';
    drawn.forEach((card,idx)=>{
        const kw=card.isReversed?card.reversed:card.upright;
        const desc=card.isReversed?card.reversedDesc:card.uprightDesc;
        const loveText=card.isReversed&&card.reversedLove?card.reversedLove:card.love;
        const workText=card.isReversed&&card.reversedWork?card.reversedWork:card.work;
        const adviceText=card.isReversed&&card.reversedAdvice?card.reversedAdvice:card.advice;
        const div=document.createElement('div');div.className='interp-card';div.style.animationDelay=`${idx*0.1}s`;
        div.innerHTML=`<div class="interp-header"><div class="interp-thumb" id="itp_${idx}"></div><div class="info"><div class="card-name">${card.name}</div><div class="card-en">${card.en}</div></div><span class="pos-badge ${card.isReversed?'rev':'up'}">${card.isReversed?'逆位 ↓':'正位 ↑'}</span></div><div class="interp-position">✦ ${card.position}</div><div class="interp-keywords">${kw.map(k=>`<span class="interp-keyword">${k}</span>`).join('')}</div><div class="interp-sections"><div><div class="interp-section-title">✦ 牌意解读</div><div class="interp-text">${desc}</div></div>${loveText?`<div><div class="interp-section-title">♡ 感情方面</div><div class="interp-text">${loveText}</div></div>`:''} ${workText?`<div><div class="interp-section-title">☆ 事业方面</div><div class="interp-text">${workText}</div></div>`:''} ${adviceText?`<div><div class="interp-section-title">✧ 建议指引</div><div class="interp-text">${adviceText}</div></div>`:''}</div>`;
        fillCardImg(div.querySelector('.interp-thumb'), card.id);
        area.appendChild(div);
    });
    area.scrollIntoView({behavior:'smooth',block:'start'});
}

// ===== SAVE / HISTORY =====
function showSaveModal(){document.getElementById('saveModal').classList.add('active');const i=document.getElementById('saveNameInput');i.value='';i.focus();}
function closeSaveModal(){document.getElementById('saveModal').classList.remove('active');}
function doSave(){
    try{
        const name=document.getElementById('saveNameInput').value.trim()||'未命名占卜';
        const record={id:Date.now(),name,date:new Date().toLocaleString('zh-CN'),spread:currentSpread.name,
            deckType:deckType==='major'?'大阿卡纳':'全牌',cards:drawn.map(c=>({name:c.name,en:c.en,isReversed:c.isReversed,position:c.position}))};
        let h=JSON.parse(localStorage.getItem('tarotHistory')||'[]');h.unshift(record);if(h.length>50)h=h.slice(0,50);
        localStorage.setItem('tarotHistory',JSON.stringify(h));closeSaveModal();
        document.querySelectorAll('.action-btn.primary').forEach(b=>{if(b.textContent.includes('保存')){const o=b.textContent;b.textContent='✓ 已保存';setTimeout(()=>b.textContent=o,1500);}});
    }catch(e){
        closeSaveModal();
        alert('保存失败，可能是浏览器隐私模式或存储空间已满');
    }
}
function renderHistory(){
    const list=document.getElementById('historyList');
    let h=[];try{h=JSON.parse(localStorage.getItem('tarotHistory')||'[]');}catch(e){h=[];}
    if(!h.length){list.innerHTML=`<div class="history-empty"><span class="icon">🌙</span><p>还没有占卜记录</p><p style="margin-top:8px;font-size:0.72rem;">去抽一张牌吧，星辰在等待你的提问</p></div>`;return;}
    list.innerHTML=h.map(r=>`<div class="history-item"><div class="history-item-header"><div><div class="history-item-name">${r.name}</div><div class="history-item-meta">${r.spread} · ${r.deckType} · ${r.date}</div></div><button class="history-delete" onclick="deleteHistory(${r.id})" title="删除">✕</button></div><div class="history-item-cards">${r.cards.map(c=>`<span class="history-tag ${c.isReversed?'rev':''}">${c.name} ${c.isReversed?'↓':'↑'}</span>`).join('')}</div></div>`).join('');
}
function deleteHistory(id){let h=JSON.parse(localStorage.getItem('tarotHistory')||'[]');h=h.filter(r=>r.id!==id);localStorage.setItem('tarotHistory',JSON.stringify(h));renderHistory();}

// ===== STARFIELD + AURORA =====
const starCanvas=document.getElementById('starfield'),starCtx=starCanvas.getContext('2d');
const auroraCanvas=document.getElementById('auroraCanvas'),auroraCtx=auroraCanvas.getContext('2d');
let stars=[],shootingStars=[],starClusters=[],mouseX=innerWidth/2,mouseY=innerHeight/2;

function resize(){starCanvas.width=auroraCanvas.width=innerWidth;starCanvas.height=auroraCanvas.height=innerHeight;initStars();}
function initStars(){stars=[];const c=Math.floor((innerWidth*innerHeight)/1200);
    for(let i=0;i<c;i++)stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.6+0.15,o:Math.random()*0.85+0.15,speed:Math.random()*0.015+0.003,phase:Math.random()*Math.PI*2,layer:Math.floor(Math.random()*3),hue:Math.random()>0.6?[210,230,40,270,190][Math.floor(Math.random()*5)]:0});
    starClusters=[];const cc=Math.floor(c*0.15);
    for(let i=0;i<cc;i++){const t=Math.random(),cx=innerWidth*(0.1+t*0.8),cy=innerHeight*(0.15+t*0.5)+(Math.random()-0.5)*innerHeight*0.2;
        starClusters.push({x:cx+(Math.random()-0.5)*80,y:cy+(Math.random()-0.5)*60,r:Math.random()*0.8+0.1,o:Math.random()*0.5+0.1,speed:Math.random()*0.01+0.002,phase:Math.random()*Math.PI*2});}}

function drawAurora(t){
    auroraCtx.clearRect(0,0,auroraCanvas.width,auroraCanvas.height);const w=auroraCanvas.width,h=auroraCanvas.height;
    for(let b=0;b<4;b++){const by=h*(0.12+b*0.1),hu=[160,200,230,280][b],al=[0.025,0.022,0.018,0.015][b];
        auroraCtx.beginPath();auroraCtx.moveTo(0,h);
        for(let x=0;x<=w;x+=4){const n=x/w,y=by+Math.sin(n*3+t*0.0003+b)*40+Math.sin(n*5-t*0.0005+b*2)*25+Math.sin(n*1.5+t*0.0002)*60;auroraCtx.lineTo(x,y);}
        auroraCtx.lineTo(w,h);auroraCtx.closePath();
        const g=auroraCtx.createLinearGradient(0,by-100,0,by+200);
        g.addColorStop(0,`hsla(${hu},80%,60%,0)`);g.addColorStop(0.3,`hsla(${hu},70%,50%,${al})`);
        g.addColorStop(0.6,`hsla(${hu+20},60%,40%,${al*0.7})`);g.addColorStop(1,`hsla(${hu},50%,30%,0)`);
        auroraCtx.fillStyle=g;auroraCtx.fill();}
    const mg=auroraCtx.createRadialGradient(w*0.48,h*0.35,0,w*0.48,h*0.35,h*0.6);
    mg.addColorStop(0,`rgba(200,180,240,${0.02+Math.sin(t*0.0004)*0.005})`);mg.addColorStop(0.3,'rgba(150,130,200,0.01)');mg.addColorStop(1,'rgba(0,0,0,0)');
    auroraCtx.fillStyle=mg;auroraCtx.fillRect(0,0,w,h);
}

function renderStars(t){
    starCtx.clearRect(0,0,starCanvas.width,starCanvas.height);
    const mg=starCtx.createLinearGradient(0,0,starCanvas.width,starCanvas.height);
    mg.addColorStop(0,'rgba(100,80,180,0.008)');mg.addColorStop(0.25,'rgba(80,100,200,0.012)');
    mg.addColorStop(0.5,'rgba(150,130,220,0.018)');mg.addColorStop(0.75,'rgba(80,110,200,0.012)');
    mg.addColorStop(1,'rgba(100,80,150,0.008)');starCtx.fillStyle=mg;starCtx.fillRect(0,0,starCanvas.width,starCanvas.height);
    stars.forEach(s=>{const tw=Math.sin(t*s.speed+s.phase)*0.35+0.65,px=(mouseX-innerWidth/2)*(s.layer+1)*0.0015,py=(mouseY-innerHeight/2)*(s.layer+1)*0.0015,x=s.x+px,y=s.y+py;
        starCtx.beginPath();starCtx.arc(x,y,s.r*tw,0,Math.PI*2);
        starCtx.fillStyle=s.hue?`hsla(${s.hue},60%,85%,${s.o*tw})`:`rgba(255,255,255,${s.o*tw})`;starCtx.fill();
        if(s.r>1.2){const g=starCtx.createRadialGradient(x,y,0,x,y,s.r*4);
            g.addColorStop(0,s.hue?`hsla(${s.hue},50%,80%,${0.1*tw})`:`rgba(220,220,255,${0.1*tw})`);
            g.addColorStop(1,'rgba(220,220,255,0)');starCtx.beginPath();starCtx.arc(x,y,s.r*4,0,Math.PI*2);starCtx.fillStyle=g;starCtx.fill();}
        if(s.r>1.4&&s.o>0.6){const sl=s.r*6*tw;starCtx.strokeStyle=`rgba(255,255,255,${0.08*tw})`;starCtx.lineWidth=0.5;
            starCtx.beginPath();starCtx.moveTo(x-sl,y);starCtx.lineTo(x+sl,y);starCtx.moveTo(x,y-sl);starCtx.lineTo(x,y+sl);starCtx.stroke();}});
    starClusters.forEach(s=>{const tw=Math.sin(t*s.speed+s.phase)*0.3+0.7;starCtx.beginPath();starCtx.arc(s.x,s.y,s.r*tw,0,Math.PI*2);
        starCtx.fillStyle=`rgba(190,185,230,${s.o*tw})`;starCtx.fill();});
    if(Math.random()<0.003)shootingStars.push({x:Math.random()*innerWidth*0.8,y:Math.random()*innerHeight*0.4,len:Math.random()*120+50,spd:Math.random()*7+3,angle:Math.PI/4+(Math.random()-0.5)*0.4,opacity:1});
    shootingStars=shootingStars.filter(ss=>{ss.x+=Math.cos(ss.angle)*ss.spd;ss.y+=Math.sin(ss.angle)*ss.spd;ss.opacity-=0.012;if(ss.opacity<=0)return false;
        const g=starCtx.createLinearGradient(ss.x,ss.y,ss.x-Math.cos(ss.angle)*ss.len,ss.y-Math.sin(ss.angle)*ss.len);
        g.addColorStop(0,`rgba(255,255,255,${ss.opacity})`);g.addColorStop(1,'rgba(255,255,255,0)');
        starCtx.beginPath();starCtx.moveTo(ss.x,ss.y);starCtx.lineTo(ss.x-Math.cos(ss.angle)*ss.len,ss.y-Math.sin(ss.angle)*ss.len);
        starCtx.strokeStyle=g;starCtx.lineWidth=1.2;starCtx.stroke();
        starCtx.beginPath();starCtx.arc(ss.x,ss.y,1.5,0,Math.PI*2);starCtx.fillStyle=`rgba(255,255,255,${ss.opacity})`;starCtx.fill();return true;});}

function animate(t){renderStars(t);drawAurora(t);requestAnimationFrame(animate);}
function createParticles(){const c=document.getElementById('floating-particles');for(let i=0;i<12;i++){const p=document.createElement('div');p.className='floating-particle';p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*10+'s';p.style.animationDuration=(Math.random()*8+8)+'s';const s=Math.random()*2+1;p.style.width=s+'px';p.style.height=s+'px';c.appendChild(p);}}

// ===== AI 星谕 =====
const AI_WORKER = 'https://api.siliconflow.cn/v1/chat/completions';
const AI_KEY = window.TAROT_AI_KEY || '';
let aiMessages = [];
let aiLoading = false;

function buildSystemPrompt() {
    let cardInfo = drawn.map((c, i) => {
        const orient = c.isReversed ? '逆位' : '正位';
        return `第${i+1}张 [${c.position}]：${c.name}（${c.en}）- ${orient}`;
    }).join('\n');
    
    return `你是「星谕」，一位温柔而神秘的塔罗灵感向导。你的语气像星空下的低语，温暖、优雅、充满诗意，同时也富有洞察力。

用户使用了「${currentSpread.name}」牌阵（${deckType === 'major' ? '大阿卡纳' : '全牌78张'}），抽到了以下牌：

${cardInfo}

请你：
1. 先综合所有牌的关系，给出整体局势的深度解读
2. 分析牌与牌之间的关联和呼应
3. 给出核心建议和启示
4. 之后用户可能会继续追问，你要像一位贴心的占卜师一样耐心解答

注意：
- 语气温暖神秘，像星空下的对话
- 适当使用 ✦ ☽ ✧ 等符号增加氛围感
- 每次回复控制在300字以内，简洁有力
- 用中文回复`;
}

function openAI() {
    document.getElementById('aiModal').classList.add('active');
    const msgBox = document.getElementById('aiMessages');
    
    if (aiMessages.length === 0) {
        aiMessages = [{ role: 'system', content: buildSystemPrompt() }];
        msgBox.innerHTML = '';
        addAIMessage('loading', '✦ 星谕正在感应牌面的能量...');
        callAI();
    }
}

function closeAI() {
    document.getElementById('aiModal').classList.remove('active');
}

function addAIMessage(type, text) {
    const msgBox = document.getElementById('aiMessages');
    const div = document.createElement('div');
    div.className = 'ai-msg ' + type;
    if (type === 'assistant') {
        div.innerHTML = '<div class="msg-name">☽ 星谕</div>' + formatAIText(text);
    } else if (type === 'user') {
        div.innerHTML = '<div class="msg-name">你</div>' + text;
    } else if (type === 'loading') {
        div.innerHTML = text;
        div.id = 'aiLoading';
    }
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

function removeLoading() {
    const el = document.getElementById('aiLoading');
    if (el) el.remove();
}

function formatAIText(text) {
    return text.replace(/\n/g, '<br>');
}

async function callAI() {
    aiLoading = true;
    document.getElementById('aiSendBtn').disabled = true;
    
    try {
        const res = await fetch(AI_WORKER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AI_KEY },
    body: JSON.stringify({ model: 'deepseek-ai/DeepSeek-V3', messages: aiMessages, temperature: 0.8, max_tokens: 2000, stream: false })
});
        
        const data = await res.json();
        removeLoading();
        
        if (data.choices && data.choices[0]) {
            const reply = data.choices[0].message.content;
            aiMessages.push({ role: 'assistant', content: reply });
            addAIMessage('assistant', reply);
        } else if (data.error) {
            addAIMessage('assistant', '✦ 星光暂时被云雾遮挡了...请稍后再试\n(' + (data.error.message || '连接异常') + ')');
        } else {
            addAIMessage('assistant', '✦ 星光暂时被云雾遮挡了...请稍后再试');
        }
    } catch (e) {
        removeLoading();
        addAIMessage('assistant', '✦ 与星辰的连接暂时中断了...请检查网络后再试');
    }
    
    aiLoading = false;
    document.getElementById('aiSendBtn').disabled = false;
}

function sendAI() {
    if (aiLoading) return;
    const input = document.getElementById('aiInput');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    addAIMessage('user', text);
    aiMessages.push({ role: 'user', content: text });
    addAIMessage('loading', '✦ 星谕正在凝视星辰...');
    callAI();
}

function resetAIChat() {
    aiMessages = [];
    const msgBox = document.getElementById('aiMessages');
    if (msgBox) msgBox.innerHTML = '';
}    
// ===== 答案之书数据 - 400条 =====
const BOOK_ANSWERS = [
    "是的，他在想你。","时机未到，耐心等待。","勇敢一点，幸福不会自己走来。",
    "你们之间有特殊的缘分。","不要害怕表达你的心意。","这段关系值得你再给一次机会。",
    "他会主动联系你的。","放下过去，新的故事正在开始。","你的真心终会被看见。",
    "这是命中注定的相遇。","他在等你迈出第一步。","不要用理性去分析感情，跟随心走。",
    "先学会爱自己，别人才会来爱你。","会有一个意想不到的人出现。","坦诚是打开心门的钥匙。",
    "复合的可能性存在，但需要双方努力。","你正在吸引对的人。","有些事需要顺其自然。",
    "你值得更好的。","暂时分离是为了更好的重逢。","相信你的第六感。",
    "这是你一直在等待的机会。","相信自己，你的直觉很准。","机遇正在向你招手。",
    "保持专注，你走在正确的道路上。","大胆尝试新事物。","你正处于转折点。",
    "晋升的机会即将来临。","合作会带来意想不到的收获。","你需要更多的耐心。",
    "新的项目即将开始。","你需要学会说不。","团队配合比个人能力更重要。",
    "这是你一直在等待的机会。","保持热情，但也要务实。","答案就在你心里。",
    "跟随你的直觉。","你比自己想象的更有智慧。","时间会给你答案。",
    "不要想太多，做就是了。","问题本身就是答案。","跳出框框思考。",
    "你需要换一个视角。","答案会自己出现的。","慢下来，深呼吸。",
    "你正在正确的方向上前行。","答案会在你最意想不到的时候出现。","相信过程。",
    "你的内心已经有答案了。","有时候放弃是一种智慧。","退一步海阔天空。",
    "不要让恐惧控制你的决定。","一切都有它的道理。","答案是肯定的。",
    "答案是否定的。","这取决于你自己的选择。","你正在学习一个重要的课题。",
    "不要急于给事物贴标签。","你的判断是对的。","答案比你想象的简单。",
    "相信奇迹会发生。","你正在被守护着。","因果循环，报应不爽。",
    "你需要更多的勇气。","这是成长的代价。","不要重蹈覆辙。",
    "你正在收获努力的果实。","一切皆有可能。","你需要接受现实。",
    "这只是一个过渡期。","你正在被考验。","不要害怕与众不同。",
    "这是生命的礼物。","你正在经历一个重要的时刻。","相信宇宙的安排。",
    "你需要学会放手。","你比昨天更接近答案了。","不要被过去束缚。",
    "这是一个新的开始。","你正在积累智慧。","答案在当下。",
    "你正在变得更强。","不要让情绪影响判断。","你需要找到平衡。",
    "不要害怕未知。","你正在接近目标。","美好的未来正在等着你。",
    "意想不到的好事即将发生。","你将实现你的愿望。","下一个转角会有惊喜。",
    "你的梦想会成真的。","好事即将发生。","你的人生即将迎来转机。",
    "新的篇章即将展开。","你正在走向幸福。","最好的尚未到来。",
    "惊喜正在路上。","你将克服所有困难。","黎明前的黑暗即将过去。",
    "你的努力终将开花结果。","新的机遇即将出现。","你将找到内心的平静。",
    "保持乐观，未来可期。","重要的变化即将到来。","你的人生将迎来新的高度。",
    "不要放弃，美好的事物值得等待。","你正在创造自己的命运。","你的愿望会实现的。",
    "更美好的日子即将到来。","你正在走向成熟。","你将收获满满的幸福。",
    "你的坚持会有回报的。","你正在接近你的目标。","未来是光明的，保持信念。",
    "你将遇到志同道合的人。","你正在书写自己的传奇。","意想不到的祝福即将到来。",
    "你正在被宇宙眷顾。","新的旅程即将开始。","你将实现自我价值。",
    "你正在成为更好的自己。","希望永远存在。","新的开始即将到来。",
    "相信自己，你不会选错。","跟随你的心走。","你需要权衡利弊。",
    "不要冲动，冷静思考。","相信你的第一直觉。","这个选择会带来成长。",
    "选那个让你更勇敢的。","你需要更多信息。","选择你内心真正想要的。",
    "勇敢踏出第一步。","暂时不做决定也可以。","选择快乐的那个。",
    "不要被他人的意见左右。","听从内心的声音。","你已经有答案了。",
    "这是一个重要的选择。","每一个选择都有意义。","选择你不会后悔的。",
    "选择行动而非等待。","不要害怕失败。","选择爱而非恐惧。",
    "这是一个双赢的选择。","选择真诚而非伪装。","答案就在你眼前。",
    "这是一个艰难的选择，但你会做出正确的决定。","选择诚实面对自己。",
    "相信命运会引导你。","这是一个改变命运的选择。","选择让你安心的。",
    "不要害怕做出决定。","这个选择会让你自由。","选择当下而非完美。",
    "这是一个值得冒险的选择。","你的选择是对的。","不要等待完美的时机。",
    "一切都会好起来的。","你已经很棒了。","深呼吸，慢慢来。",
    "你不是一个人。","一切都会过去的。","你值得被爱。",
    "休息一下，你累了。","你比自己想象的坚强。","不要对自己太苛刻。",
    "你正在做得很好了。","允许自己悲伤。","你值得幸福。",
    "你并不孤单。","给自己一点时间。","你值得被珍惜。",
    "阳光总在风雨后。","你正在被爱着。","你比自己以为的更好。",
    "你正在成长。","给自己一个微笑。","乌云会散去的。",
    "你值得拥有美好的事物。","不要放弃希望。","让过去成为过去。",
    "你是独一无二的存在。","让自己喘口气。","痛苦是成长的养分。",
    "你正在穿越风暴。","请善待自己。","你比自己想象的勇敢。",
    "不要忘记你的价值。","保持希望。","你正在创造改变。",
    "你是被需要的。","你正在变得更好。","让自己放松一下。",
    "你值得被倾听。","不要忘记微笑。","你正在被宇宙眷顾。",
    "给自己一些耐心。","你比自己以为的更强大。","让心安静下来。",
    "你值得拥有平静。","你正在接近光明。","你是美丽的。",
    "你正在被温柔以待。","信任是关系的基石。","行动胜于空谈。",
    "简单才是真。","爱是唯一的答案。","万物皆有时。",
    "活在当下。","种什么因，得什么果。","你的态度决定一切。",
    "学会接受。","学会给予。","学会倾听。","学会说不。",
    "学会原谅。","学会放手。","学会感恩。","学会等待。",
    "学会相信。","这不是终点。","这只是过程。",
    "你正在觉醒。","答案就在身边。","不要忽视直觉。",
    "保持初心。","这是生命给你的礼物。","接受它。",
    "拥抱变化。","敞开心扉。","你比你以为的更自由。",
    "你比你以为的更完整。","你比你以为的更被爱。","你比你以为的更强大。",
    "你比你以为的更值得。","你比你以为的更有才华。","你比你以为的更幸运。",
    "你比你以为的更聪明。","你比你以为的更勇敢。","你比你以为的更美丽。",
    "你比你以为的更平静。","你比你以为的更幸福。","你比你以为的更充满爱。",
    "你比你以为的更充满希望。","你比你以为的更充满力量。","你比你以为的更充满智慧。",
    "你比你以为的更充满创造力。","你比你以为的更充满热情。","你比你以为的更充满好奇。",
    "你比你以为的更充满感恩。","你比你以为的更充满和平。","你比你以为的更充满喜悦。",
    "相信自己的无限可能。"
];

// ===== 答案之书功能 =====
function bookSpawnStars() {
    const container = document.getElementById('bookModalStars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 14; i++) {
        const star = document.createElement('div');
        star.className = 'book-star';
        star.style.left = 15 + Math.random() * 70 + '%';
        star.style.top = 15 + Math.random() * 70 + '%';
        star.style.animationDelay = Math.random() * 1 + 's';
        container.appendChild(star);
    }
}

function bookShowAnswer() {
    const answer = BOOK_ANSWERS[Math.floor(Math.random() * BOOK_ANSWERS.length)];
    const modal = document.getElementById('bookModal');
    const answerEl = document.getElementById('bookModalAnswer');
    if (!modal || !answerEl) return;
    answerEl.textContent = '';
    modal.classList.add('active');
    bookSpawnStars();
    answerEl.style.animation = 'none';
    answerEl.offsetHeight;
    answerEl.style.animation = '';
    setTimeout(function() { answerEl.textContent = answer; }, 250);
    playSfx && playSfx('complete');
}

function bookCloseModal() {
    var modal = document.getElementById('bookModal');
    if (modal) modal.classList.remove('active');
}

function showBook() {
    document.getElementById('homePage').classList.add('hidden');
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    var bp = document.getElementById('bookPage');
    if (bp) { bp.classList.add('active'); bp.classList.add('page-enter'); }
}

function initBookModal() {
    var modal = document.getElementById('bookModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) bookCloseModal();
        });
    }
}

// 初始化弹窗事件
initBookModal();
// ===== 预加载图片（分批，不抢带宽）=====
function preloadBatch(start, end) {
    if (start >= end) return;
    loadCachedImg(start, function() {
        setTimeout(function() { preloadBatch(start + 1, end); }, 50);
    });
}
setTimeout(() => preloadBatch(0, 22), 1000);
setTimeout(() => preloadBatch(22, 78), 8000);
// ===== 微信浏览器检测 =====
if (/MicroMessenger/i.test(navigator.userAgent)) {
    document.body.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#030014;color:#e8dcc8;font-family:sans-serif;text-align:center;padding:40px;"><div style="font-size:2rem;margin-bottom:20px;">✦</div><div style="font-size:1.1rem;color:#f0d68a;margin-bottom:15px;">Arcana Whisper</div><div style="font-size:0.85rem;line-height:1.8;color:#b8a890;">请点击右上角 <strong style="color:#f0d68a;">⋯</strong><br>选择 <strong style="color:#f0d68a;">「在浏览器中打开」</strong><br>即可正常使用塔罗占卜</div></div>';
}
// ===== INIT =====
// ===== 月相显示 =====
function getMoonPhase(){
    var now=new Date(),year=now.getFullYear(),month=now.getMonth()+1,day=now.getDate();
    if(month<=2){year--;month+=12;}
    var A=Math.floor(year/100),B=2-A+Math.floor(A/4);
    var JD=Math.floor(365.25*(year+4716))+Math.floor(30.6001*(month+1))+day+B-1524.5;
    var daysSinceNew=JD-2451549.5;
    var newMoons=daysSinceNew/29.53059;
    var phase=(newMoons-Math.floor(newMoons))*29.53059;
    var idx,icon,cname;
    if(phase<1.85){idx=0;icon='🌑';cname='新月';}
    else if(phase<5.55){idx=1;icon='🌒';cname='蛾眉月';}
    else if(phase<9.25){idx=2;icon='🌓';cname='上弦月';}
    else if(phase<12.95){idx=3;icon='🌔';cname='盈凸月';}
    else if(phase<16.65){idx=4;icon='🌕';cname='满月';}
    else if(phase<20.35){idx=5;icon='🌖';cname='亏凸月';}
    else if(phase<24.05){idx=6;icon='🌗';cname='下弦月';}
    else if(phase<27.75){idx=7;icon='🌘';cname='残月';}
    else{idx=0;icon='🌑';cname='新月';}
    return {icon:icon,name:cname,day:Math.floor(phase)};
}
function renderMoonPhase(){
    var mp=getMoonPhase();
    var el=document.getElementById('moonPhaseDisplay');
    if(el) el.innerHTML=mp.icon+' 今夜 · '+mp.name;
}
renderMoonPhase();
window.addEventListener('resize',resize);
window.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;});
resize();createParticles();requestAnimationFrame(animate);
