// 参考:https://t.me/zhetengsha/1066
// 源文件:https://raw.githubusercontent.com/xishang0128/sub-store-template/main/sing-box.js,可由外部传参
// "所有订阅":用于查看订阅的节点情况
// "常规订阅":流量大的订阅
// "故障转移":稳定高速的订阅

let config = JSON.parse($files[0])

let all_subs = await produceArtifact({
  name: "AllSub",
  type: 'collection',
  platform: 'sing-box',
  produceType: 'internal',
})

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
// 添加所有节点到outbounds锚点
config.outbounds.push(...all_subs)

config.outbounds.map(i => {
  if (['🛰️ 所有订阅'].includes(i.tag)) {
    i.outbounds.push(...getTags(all_subs))
  }

  if (['🛫 常规订阅'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs))
  }

  if (['🦄 故障转移'].includes(i.tag)) {
    i.outbounds.push(...getTags(pri_subs))
  }

  if (['🇭🇰 香港节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /香港|🇭🇰|HK|HongKong|九龙|湾仔|深水埗|西贡|沙田|元朗|观塘/i))
  }

  if (['🇨🇳 台湾节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /中国|台湾|🇨🇳|🇹🇼|⮽|台北|桃园|高雄|新北|台中|台南/i))
  }

  if (['🇯🇵 日本节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /日本|🇯🇵|JP|Japan|东京|大阪|横滨|名古屋|札幌|神户|福冈|广岛|川崎|仙台|奈良|长崎|北九州|新泻|冲绳|北海道|函馆|轻井泽|堺市|埼玉/i))
  }

  if (['🇰🇷 韩国节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /韩国|🇰🇷|KR|Korean|首尔|蔚山|仁川|釜山|大田|大邱|光州/i))
  }

  if (['🇺🇸 美国节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /美国|🇺🇸|US|USA|America|纽约|洛杉矶|芝加哥|休斯顿|费城|波士顿|旧金山|亚特兰大|华盛顿|波特兰|底特律|杰克逊维尔|萨克拉门托|达拉斯|菲尼克斯|丹佛|匹兹堡|西雅图|圣保罗|蒙哥马利|圣安东尼奥|圣地亚哥|圣何塞/i))
  }

  if (['🇸🇬 狮城节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /新加坡|狮城|🇸🇬|SG|Singapore/i))
  }

  if (['🌍 其他节点'].includes(i.tag)) {
    i.outbounds.push(...getTags(pub_subs, /英国|🇬🇧|德国|🇩🇪|法国|🇫🇷|瑞士|🇨🇭|比利时|🇧🇪|芬兰|🇫🇮|瑞典|🇸🇪|挪威|🇳🇴|冰岛|🇮🇸|丹麦|🇩🇰|法罗群岛|🇫🇴|爱尔兰|🇮🇪|荷兰|🇳🇱|卢森堡|🇱🇺|摩纳哥|🇲🇨|奥地利|🇦🇹|波兰|🇵🇱|匈牙利|🇭🇺|斯洛伐克|🇸🇰|列支敦士登|🇱🇮|爱沙尼亚|🇪🇪|拉脱维亚|🇱🇻|立陶宛|🇱🇹|白俄罗斯|🇧🇾|乌克兰|🇺🇦|摩尔多瓦|🇲🇩|西班牙|🇪🇸|葡萄牙|🇵🇹|安道尔|🇦🇩|意大利|🇮🇹|希腊|🇬🇷|马耳他|🇲🇹|梵蒂冈|🇻🇦|圣马力诺|🇸🇲|斯洛文尼亚|🇸🇮|克罗地亚|🇭🇷|阿尔巴尼亚|🇦🇱|罗马尼亚|🇷🇴|保加利亚|🇧🇬|塞尔维亚|🇷🇸|黑山|🇲🇪|北马其顿|🇲🇰|波黑|🇧🇦|直布罗陀|🇬🇮|欧洲|🇪🇺|蒙古|🇲🇳|朝鲜|🇰🇵|阿富汗|🇦🇫|伊朗|🇮🇷|土耳其|🇹🇷|塞浦路斯|🇨🇾|叙利亚|🇸🇾|黎巴嫩|🇱🇧|巴勒斯坦|🇵🇸|以色列|🇮🇱|约旦|🇯🇴|伊拉克|🇮🇶|科威特|🇰🇼|沙特阿拉伯|沙特|🇸🇦|也门|🇾🇪|阿曼|🇴🇲|阿拉伯联合酋长国|阿联酋|🇦🇪|卡塔尔|🇶🇦|巴林|🇧🇭|格鲁吉亚|🇬🇪|亚美尼亚|🇦🇲|阿塞拜疆|🇦🇿|土库曼斯坦|🇹🇲|乌兹别克斯坦|🇺🇿|吉尔吉斯斯坦|🇰🇬|塔吉克斯坦|🇹🇯|哈萨克斯坦|🇰🇿|印度|🇮🇳|马尔代夫|🇲🇻|不丹|🇧🇹|斯里兰卡|🇱🇰|巴基斯坦|🇵🇰|孟加拉国|🇧🇩|尼泊尔|🇳🇵|马来西亚|🇲🇾|印度尼西亚|🇮🇩|泰国|🇹🇭|越南|🇻🇳|老挝|🇱🇦|菲律宾|🇵🇭|柬埔寨|🇰🇭|缅甸|文莱|🇧🇳|东帝汶|🇹🇱|澳门|🇲🇴|亚洲|🌏|加拿大|🇨🇦|墨西哥|🇲🇽|危地马拉|🇬🇹|伯利兹|🇧🇿|萨尔瓦多|🇸🇻|洪都拉斯|🇭🇳|巴拿马|🇵🇦|巴哈马|🇧🇸|古巴|🇨🇺|牙买加|🇯🇲|海底|🇭🇹|多米尼加|🇩🇴|哥斯达黎加|🇨🇷|圣基茨和尼维斯|🇰🇳|安提瓜和巴布达|🇦🇬|多米尼克|🇩🇲|圣卢西亚|🇱🇨|圣文森特和格林纳丁斯|🇻🇨|巴巴多斯|🇧🇧|格林纳达|🇬🇩|特立尼达和多巴哥|🇹🇹|尼加拉瓜|🇳🇮|厄瓜多尔|🇪🇨|哥伦比亚|🇨🇴|委内瑞拉|🇻🇪|秘鲁|🇵🇪|巴西|🇧🇷|智利|🇨🇱|乌拉圭|🇺🇾|巴拉圭|🇵🇾|阿根廷|🇦🇷|玻利维亚|🇧🇴|圭亚那|🇬🇾|苏里南|🇸🇷|法属圭亚那|🇬🇫|美洲|🌎|澳大利亚|🇦🇺|南极洲|🇦🇶|埃及|🇪🇬/i))
  }
})
// 写入配置文件
$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}