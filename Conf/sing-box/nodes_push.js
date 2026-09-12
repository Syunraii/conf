let config = JSON.parse($files[0])

// 三条组合订阅名称分别为PubSub、PubSub、PubSub
let pub_subs = await produceArtifact({
  name: "PubSub",
  type: 'collection',
  platform: 'sing-box',
  produceType: 'internal',
})
let pri_subs = await produceArtifact({
  name: "PriSub",
  type: 'collection',
  platform: 'sing-box',
  produceType: 'internal',
})
let tmp_subs = await produceArtifact({
  name: "TmpSub",
  type: 'collection',
  platform: 'sing-box',
  produceType: 'internal',
})

// 必须, 意思是将订阅的节点信息依次写入outbounds, 方可使用
config.outbounds.push(...pub_subs)
config.outbounds.push(...pri_subs)
config.outbounds.push(...tmp_subs)

// 过滤倍率节点,  >=1为正常+高倍率日常使用, <1供流媒体使用 
function rateOf(tag) {
  const m = tag.match(/(\d+(?:\.\d+)?)[×x]/i)
  return m ? parseFloat(m[1]) : 1
}

config.outbounds.map(i => {
  if (['🎡 常规选择'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, tag => rateOf(tag) >= 1))
  }

  if (['🦄 故障转移'].includes(i.tag)) {
    i.outbounds.push(...getTags(pri_subs))
  }

  if (['🪂 临时选择'].includes(i.tag)) {
    i.outbounds.push(...getTags(tmp_subs))
  }

  if (['♿️ 低倍选择'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, tag => rateOf(tag) < 1))
  }

  if (['🇭🇰 香港自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /香港|🇭🇰|HK|HongKong/i))
  }

  if (['🇨🇳 台湾自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /中国|台湾|🇨🇳|🇹🇼/i))
  }

  if (['🇯🇵 日本自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /日本|🇯🇵|JP|Japan/i))
  }

  if (['🇰🇷 韩国自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /韩国|🇰🇷|KR|Korean/i))
  }

  if (['🇺🇸 美国自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /美国|🇺🇸|US|USA|United State/i))
  }

  if (['🇸🇬 狮城自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /新加坡|狮城|🇸🇬|SG|Singapore/i))
  }

  if (['🌍 其他自动'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /英国|🇬🇧|德国|🇩🇪|法国|🇫🇷|瑞士|🇨🇭|比利时|🇧🇪|芬兰|🇫🇮|瑞典|🇸🇪|挪威|🇳🇴|冰岛|🇮🇸|丹麦|🇩🇰|法罗群岛|🇫🇴|爱尔兰|🇮🇪|荷兰|🇳🇱|卢森堡|🇱🇺|摩纳哥|🇲🇨|奥地利|🇦🇹|波兰|🇵🇱|匈牙利|🇭🇺|斯洛伐克|🇸🇰|列支敦士登|🇱🇮|爱沙尼亚|🇪🇪|拉脱维亚|🇱🇻|立陶宛|🇱🇹|白俄罗斯|🇧🇾|乌克兰|🇺🇦|摩尔多瓦|🇲🇩|西班牙|🇪🇸|葡萄牙|🇵🇹|安道尔|🇦🇩|意大利|🇮🇹|希腊|🇬🇷|马耳他|🇲🇹|梵蒂冈|🇻🇦|圣马力诺|🇸🇲|斯洛文尼亚|🇸🇮|克罗地亚|🇭🇷|阿尔巴尼亚|🇦🇱|罗马尼亚|🇷🇴|保加利亚|🇧🇬|塞尔维亚|🇷🇸|黑山|🇲🇪|北马其顿|🇲🇰|波黑|🇧🇦|直布罗陀|🇬🇮|欧洲|🇪🇺|蒙古|🇲🇳|朝鲜|🇰🇵|阿富汗|🇦🇫|伊朗|🇮🇷|土耳其|🇹🇷|塞浦路斯|🇨🇾|叙利亚|🇸🇾|黎巴嫩|🇱🇧|巴勒斯坦|🇵🇸|以色列|🇮🇱|约旦|🇯🇴|伊拉克|🇮🇶|科威特|🇰🇼|沙特阿拉伯|沙特|🇸🇦|也门|🇾🇪|阿曼|🇴🇲|阿拉伯联合酋长国|阿联酋|🇦🇪|卡塔尔|🇶🇦|巴林|🇧🇭|格鲁吉亚|🇬🇪|亚美尼亚|🇦🇲|阿塞拜疆|🇦🇿|土库曼斯坦|🇹🇲|乌兹别克斯坦|🇺🇿|吉尔吉斯斯坦|🇰🇬|塔吉克斯坦|🇹🇯|哈萨克斯坦|🇰🇿|印度|🇮🇳|马尔代夫|🇲🇻|不丹|🇧🇹|斯里兰卡|🇱🇰|巴基斯坦|🇵🇰|孟加拉国|🇧🇩|尼泊尔|🇳🇵|马来西亚|🇲🇾|印度尼西亚|🇮🇩|泰国|🇹🇭|越南|🇻🇳|老挝|🇱🇦|菲律宾|🇵🇭|柬埔寨|🇰🇭|缅甸|文莱|🇧🇳|东帝汶|🇹🇱|澳门|🇲🇴|亚洲|🌏|加拿大|🇨🇦|墨西哥|🇲🇽|危地马拉|🇬🇹|伯利兹|🇧🇿|萨尔瓦多|🇸🇻|洪都拉斯|🇭🇳|巴拿马|🇵🇦|巴哈马|🇧🇸|古巴|🇨🇺|牙买加|🇯🇲|海底|🇭🇹|多米尼加|🇩🇴|哥斯达黎加|🇨🇷|圣基茨和尼维斯|🇰🇳|安提瓜和巴布达|🇦🇬|多米尼克|🇩🇲|圣卢西亚|🇱🇨|圣文森特和格林纳丁斯|🇻🇨|巴巴多斯|🇧🇧|格林纳达|🇬🇩|特立尼达和多巴哥|🇹🇹|尼加拉瓜|🇳🇮|厄瓜多尔|🇪🇨|哥伦比亚|🇨🇴|委内瑞拉|🇻🇪|秘鲁|🇵🇪|巴西|🇧🇷|智利|🇨🇱|乌拉圭|🇺🇾|巴拉圭|🇵🇾|阿根廷|🇦🇷|玻利维亚|🇧🇴|圭亚那|🇬🇾|苏里南|🇸🇷|法属圭亚那|🇬🇫|美洲|🌎|澳大利亚|🇦🇺|南极洲|🇦🇶|埃及|🇪🇬/i))
  }
})

// 写入
$content = JSON.stringify(config, null, 2)

function getTags(proxies, cond) {
  return proxies
    .filter(p => typeof cond === 'function' ? cond(p.tag) : (!cond || cond.test(p.tag)))
    .map(p => p.tag)
}