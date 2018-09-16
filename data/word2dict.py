from pathlib import Path
import re,requests

headers = {

'Cookie':'locale=zh; BAIDUID=52EB5E034DF059519CE6C6BCD0C34E11:FG=1; to_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1513688828; from_lang_often=%5B%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%5D; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1513691349',
'Origin':'http://fanyi.baidu.com',
'Accept-Encoding':'gzip, deflate',
'Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
'Accept':'*/*',
'Referer':'http://fanyi.baidu.com/',
'X-Requested-With':'XMLHttpRequest'
        }

import json


def trans_iciba(word):
    url = 'http://www.iciba.com/index.php?a=getWordMean&c=search&list=1&word=%s&_=1513666292579' % word
    d = requests.get(url).json()['baesInfo']['symbols'][0]
    symbol = '[%s],[%s]' % (d['ph_en'], d['ph_am'])
    paraphrases = []
    for part in d['parts']:
        paraphrases.append(part['part'] + ';'.join(part['means']))
        #mp3 = d['ph_en_mp3']+','+d['ph_am_mp3']
    return '%s`%s' % (symbol, ';;'.join(paraphrases))


def trans_bd2(word):

    url = 'http://fanyi.baidu.com/v2transapi'
    data = 'from=en&to=zh&query=%s&transtype=realtime&simple_means_flag=3' % word
    try:
        d = requests.post(url, headers=headers, data=data).json()
    except Exception:
        t = requests.post(url, headers=headers, data=data).text
        raise ValueError(t)

    d = d['dict_result']['simple_means']['symbols'][0]
    symbol = '[%s],[%s]' % (d['ph_en'], d['ph_am'])
    paraphrases = []
    for part in d['parts']:
        paraphrases.append(part['part'] + ';'.join(part['means']))
        #mp3 = d['ph_en_mp3']+','+d['ph_am_mp3']
    return '%s`%s' % (symbol, ';;'.join(paraphrases))


def trans_bd(word):
    url = 'http://fanyi.baidu.com/transapi'
    params = 'from=en&to=zh&query=%s&source=txt' % word
    try:
        r = requests.post(url, headers=headers, data=params)
        d = r.json()
    except Exception:
        raise ValueError(r.text)

    if not 'result' in d:
        return trans_bd2(word)

    d = json.loads(d['result'])
    symbol = ','
    if 'voice' in d:
        voice = d['voice']
        symbol = '%s,%s' % (voice[0]['en_phonic'], voice[1]['us_phonic'])
    paraphrases = []
    for part in d['content'][0]['mean']:
        if 'pre' not in part:
            return trans_bd2(word)
        paraphrases.append(part['pre'] + ';'.join(part['cont'].keys()))
        #mp3 = d['ph_en_mp3']+','+d['ph_am_mp3']
    return '%s`%s' % (symbol, ';;'.join(paraphrases))

words = []

for line in Path('words.txt').open():
    words.append(line.strip())

for word in words[4659:]:
    print('%s`%s' %( word, trans_bd(word)))
    quit(1)

