const axios = require('axios');
const { Client } = require('discord.js-selfbot-v13');
const { spawn } = require('child_process');

// Detached process setup
if (!process.env.SPAWNED) {
    spawn('cmd', ['/k', 'node', __filename], {
        env: { ...process.env, SPAWNED: '1' },
        detached: true,
        stdio: 'inherit'
    });
    process.exit();
}

const CONFIG = {
    WEBHOOK_TIMEOUT: 15000,
    MAX_CONTENT_LENGTH: 2000,
    FETCH_LIMIT: 1,
    RETRY_ATTEMPTS: 2,
    RETRY_DELAY: 1000
};

const CAPPERS = {
    'nba-rundown': {
        channel: '1298374101232124014',
        webhook: 'https://discordapp.com/api/webhooks/1456687590764839053/UODSt825Uk8OP14Y4HY10MDyi-uT3cJewgdMoDDhXcbfoAA2VDUSCFbnSwFWYdYVlfiR'
    },
    
    'football-rundown': {
        channel: '1278756716514639956',
        webhook: 'https://discordapp.com/api/webhooks/1456687666601918595/jtSbGJPOkFo7epgfZJnr5c3JHlCA6iPP3n7DwevutNed1UBMERreDaF2w2KtnN6ZzEL4'
    },
    
    'mlb-rundown': {
        channel: '1238189573369106473',
        webhook: 'https://discordapp.com/api/webhooks/1456687736907104388/aVFm2hvR6s-wS_C2PDOavOxI4xKYkO2VioeRo8e3GULbr2zewhFUJ3CUxCVzsDvBQWsw'
    },
    
    'esports-rundown': {
        channel: '1278880593060434000',
        webhook: 'https://discordapp.com/api/webhooks/1456687808465998028/ZD7ZT6e31V70vpxiIWPKzsYIjp2gM0oA81cBFt-Hek6VJhg780vYr-okuqyAj21nHEV4'
    },
    
    'nhl-rundown': {
        channel: '1291515464136261745',
        webhook: 'https://discordapp.com/api/webhooks/1456687408794963988/mQkOI7X9CyeLwnTpVKt-0-EcB_CUYpcy5AbrLB2Wvq9UAPAcrEMjSTLHsujNFA2rfAwE'
    },
    
    'prizepicks-ev': {
        channel: '1294096333585649714',
        webhook: 'https://discordapp.com/api/webhooks/1456688393600761989/ok_kzWecW3SthbdG3uyjWVTwJjRw2Vw6eln6WRxW6OQvRtGqW1Y59_Uj5QBSK-HouBg3'
    },
    
    'underdog-ev': {
        channel: '1294096358478843934',
        webhook: 'https://discordapp.com/api/webhooks/1456688457345794131/LlSrtIbnT--hnXJ_0m-8kA1Lmvh8E5tHPHZwRUGEY9YAnwatPAkvQduIdiuk02SIJJTC'
    },
    
    'betr-ev': {
        channel: '1294096383388680223',
        webhook: 'https://discordapp.com/api/webhooks/1456688509019623510/zHRonITaUBXozxGdvBDkqdaj1oWH6L8VvopR4gv8TKzNuADlHZQHrl4qBE16_4f7-DTm'
    },
    
    'fliff-ev': {
        channel: '1321580024574382100',
        webhook: 'https://discordapp.com/api/webhooks/1456688575029575761/Nfh2obiHgtDX61edNHQxiXNo4aNZrIis04cXvkGzo6fe6tNe6IlhQaVd_COOthYs1COg'
    },
    
    'potds': {
        channel: '1233479325798367414',
        webhook: 'https://discord.com/api/webhooks/1456688649554100256/YoUtsJ2i6e8i8VT5pZHxRZdVVmhHToVj3zID-QAalLRDgYQOdUNsV5s7Mv6dZeDnpdbP'
    },
    
    'nukes-etc': {
        channel: '1310325142986948759',
        webhook: 'https://discord.com/api/webhooks/1456688714175742147/7rTOY6n8tICFn13b1lT7fChvg-4d4bFfEUiQUWKDtvL--NMsFJlAwGn3OeidCE7xoh9l'
    },
    
    'trinity-analytics': {
        channel: '1298718433084575847',
        webhook: 'https://discord.com/api/webhooks/1456688789316436040/FVEzXsqXU7pshk0vgDjbZM4yN0lIs_ugV4JwlW3_eUPoC9rB8S1tASaVgjqAEUORgpDk'
    },
    
    'dk-dfs': {
        channel: '1400014825907818578',
        webhook: 'https://discord.com/api/webhooks/1456688843326619721/SOb7Q5LWoK5_etyi0Fi0jLasZAPlYcyBtSPw4lITNYkhqLYyEJSff4Vk-V3EHI8_sWjn'
    },
    
    'matthewp07': {
        channel: '1193766477128544306',
        webhook: 'https://discord.com/api/webhooks/1456688890709672069/A7ec-y3fAFXAdo8WzUlnu8eFKIP40mHRi0FmU38itxEsQZl5GSPJ_hHuuUbu5bvFLf6n'
    },
    
    'hammeringhank': {
        channel: '1426829632174297119',
        webhook: 'https://discord.com/api/webhooks/1456688966253281290/tk95MPwuGz382yZku0TmxqvdOa2h20MSTxDUcdBmMQrKPRoMCrzXILQdn64h9iwNKQJq'
    },
    
    'caleb-bets': {
        channel: '1360392595632554064',
        webhook: 'https://discord.com/api/webhooks/1456689013560840427/z_P4g0ts-COaiWB1Rht4Ah0TRoc4OHgkN-Jl0QRmO0x1kiqsANOcoi5mfiHfkVhKN3gh'
    },
    
    'chefbestbets': {
        channel: '1275937013542944853',
        webhook: 'https://discord.com/api/webhooks/1456689088856854631/kvRDA5fzQ6WvaC0czf1rqOK-HmpbyIPQWQZOzdO9PJANpKawJbzkegDgw7EwC7bypr-a'
    },
    
    'cushplayerprops': {
        channel: '1275937155700756530',
        webhook: 'https://discord.com/api/webhooks/1456689161762377840/NfmeNNyc6o4noanVkv_St6nSV_o8F7Nolsv5LCKLM9nfMc62qRbX0tDUfIkCA-wSuZ21'
    },
    
    'deadprespicks': {
        channel: '1445473078283866242',
        webhook: 'https://discord.com/api/webhooks/1456689216615354543/8gC_WW5-DgU8wpfnMMPmL7NZbas-1IYjaaLYcpKhNqrA8LDeQubEaVfFKU48D9AN1nrk'
    },
    
    'dormroomdegen': {
        channel: '1445473005840109598',
        webhook: 'https://discord.com/api/webhooks/1456689272274026511/kZ-YoePA4i251yjfOHDmtsfORgw1YH3et0vnZ-hxZ9Aa-Rm72hNLEBgmsvBuhMYZh5xS'
    },
    
    'justinbales-ncaa': {
        channel: '1400014486290698260',
        webhook: 'https://discord.com/api/webhooks/1456689377353797748/Pi1kovSSanrA5coSzLEQpYJK2uQmfY1Q0yk_u7mRgwQoJVDmf4axXhaZoDEAdSWtmvua'
    },
    
    'ktown-soccer': {
        channel: '1381173852725579796',
        webhook: 'https://discord.com/api/webhooks/1456689444626108487/BTtzSzBbJD0ivmLSvH2VV7frrcytXW61QiAzop-T5XpI6o0mAgjh3jbUbIzdQFMRDUBZ'
    },
    
    'lawdtp-tennis': {
        channel: '1366647721771008020',
        webhook: 'https://discord.com/api/webhooks/1456689690190286848/MjGUmAbrPUp3wSPb-AKhhQbAG2_YPaKYpa19aysZppnrqVT6AGkJhdD77yJIlwnqWdV1'
    },
    
    'lev-locks': {
        channel: '1390591789550931978',
        webhook: 'https://discord.com/api/webhooks/1456689746020405382/MskxfdRJbgQx9PBaZpQqo6p5q926xmFuG6fGFtZW8jSCSiQ28ykyCRXKou2ww6mOUOPE'
    },
    
    'naz-easter': {
        channel: '1205549097365282816',
        webhook: 'https://discord.com/api/webhooks/1456689902824718530/N7yOojceZR5O4-TkMwvggXHP6cSOtfasmYuJo4RTkTQ7Jcl84YRraZOoKBl50QgjrfQC'
    },
    
    'nickycashin': {
        channel: '1445472910503444703',
        webhook: 'https://discord.com/api/webhooks/1456689957434294493/DRJFgzM0wWefXyQFQTi5DSq8-UZGnT8Wchzh5_v257QPtzELPzDvpnT3yMtXIEHIboze'
    },
    
    'razzaqlocks': {
        channel: '1334972635179647027',
        webhook: 'https://discord.com/api/webhooks/1456690120840188069/3-HIPYeK_WSVEbeRnBHiRCJE9Wkzb2Nd_cHVMyOr6N6eflFSfOrLRft1B4msE0BR-9fa'
    },
    
    'secured-picks': {
        channel: '1381174018240938015',
        webhook: 'https://discord.com/api/webhooks/1456703549286387713/wcDaZ3cLj-NhSSS3xdb5G3qo7bTp3MHZU_1BELRjm9l5YNdeHEaydodbaK2cIntywwIL'
    },
    
    'sriracha-dfs': {
        channel: '1294095790502973563',
        webhook: 'https://discord.com/api/webhooks/1456703858360451271/Lg7Hlr0cIjOUxMbFao42VGKIpGs-lNiNodAddsdaMC1YHjyX9cqKSKLSWzZXOTtvVLTf'
    },
    
    'cheeselocks': {
        channel: '1400014633116631040',
        webhook: 'https://discord.com/api/webhooks/1456703938232455361/yhJtqk9OcFJPOZqVgJL-VlL7DmdmE--EcRxfmMFHadxsWiQrpbskUxknfHdEOTWPJLll'
    },
    
    'chillimanbets': {
        channel: '1423912821552447539',
        webhook: 'https://discord.com/api/webhooks/1456703988966621297/qlVE8c18uAraW6N8DNgeAqrz-168BhH-6dzcRr_X7q2XpAQdCtr38KQ1qDlK6TtPibUp'
    },
    
    'dee_rose901': {
        channel: '1275937070145212488',
        webhook: 'https://discordapp.com/api/webhooks/1456704110354104586/GiOESRO8PbV29dDU-Jw_4UKzieqQEnMMJPflIh4Y5If5mLEd4NAjyjaQ2FNYm9dgTVBd'
    },
    
    'dfs-dojo': {
        channel: '1420492945479569569',
        webhook: 'https://discordapp.com/api/webhooks/1456704183540646050/ai-NYx5bc6TE6RtlyU1j_mO9syVhAS5sNx9iltq6daMI_B0mF8qE76352wbFyzcXq8zx'
    },
    
    'dresplaybook': {
        channel: '1445472513567232071',
        webhook: 'https://discordapp.com/api/webhooks/1456704268722639155/4oSVEIV5_YO_VgPywNtxqMxa7BLE8XxZVBueCbLsKQD3pfouKpK7UIhABbEIuW52wjGR'
    },
    
    'ethbetz-nhl': {
        channel: '1425961782727409664',
        webhook: 'https://discordapp.com/api/webhooks/1456704343158952160/BCM20GKYruTEaP0eMtm5gCmUD4ULa3yo6ePxrJLWdOY7VSU4xxQ9PTKtxcaYW4S5dT1x'
    },
    
    'furnace-mlb-models': {
        channel: '1359294671062306949',
        webhook: 'https://discordapp.com/api/webhooks/1456704436889190452/P-J7U7PBuazabULIUlUKNJEiF17sE4Jv7gm9EJXUPnGsdiTKhgULSwGZ9mm8-uoHS-2b'
    },
    
    'goblinpicks': {
        channel: '1366660643167404092',
        webhook: 'https://discordapp.com/api/webhooks/1456704550529532059/rVzaE08uso2Nv9VSorCtJ_dZRVslFwC5KnIRogFZTcREiexHPNsQtFxU_IQf3OedYeEM'
    },
    
    'gonthebettor': {
        channel: '1400014102796959784',
        webhook: 'https://discordapp.com/api/webhooks/1456704667751813261/rO7n0Ry5fgQBKpybZpjvrajWrv7AzNtoIbcHDz2Bp4pCcpp__TbpaFM-EDe5urWK2FqW'
    },
    
    'greeklocks': {
        channel: '1275937244854751254',
        webhook: 'https://discordapp.com/api/webhooks/1456704729621987487/CtHBOlK5cIJEc6mpZX8Gp1CiX1QoFrhk1nB1qvvaoIVe3z-xiHkaA0yT_tX-zEw5jI38'
    },
    
    'islandbets': {
        channel: '1400015028232392834',
        webhook: 'https://discordapp.com/api/webhooks/1456704924699070515/qC-m2uJtVP9SaDsfgRDdmCoS3uCIjJxw4bd8_9EFgNEeEMhsWeb4JJAXaQBrrZKFc4ln'
    },
    
    'jagsbets': {
        channel: '1400025495084466177',
        webhook: 'https://discordapp.com/api/webhooks/1456705067745935481/kgaF_L2NyMcS4Y-C1QVHY2oHVBS8ifpiXwKI9uJViIBK-MoSM8l4HfyfKXtRu_8o8bZN'
    },
    
    'knightlocks': {
        channel: '1390572070064095377',
        webhook: 'https://discordapp.com/api/webhooks/1456705017703698635/FMk7By3ooNBNPgOCoH4FNzDYOYS2ZQRsu9e6lxWun2sincLUMbEn_hdv83LUec0wSE_g'
    },
    
    'kbo-models': {
        channel: '1383307268006613023',
        webhook: 'https://discordapp.com/api/webhooks/1456705133168820327/aRVNbI0a6GYeuxOy9uT3lM6KDdMIZjm-FCntfVV6XIX8wr8b9Xr4IMI63_jhcDVSaaxv'
    },
    
    'mindofjakeup': {
        channel: '1423915680494780447',
        webhook: 'https://discordapp.com/api/webhooks/1456705234494558230/td_CIq3IfaWWrf6cEp5d6I9bnI71t9YUvzdNk-y5ftpFFXFBQo2cxxa3mEdzacTl10lt'
    },
    
    'ndotdiab': {
        channel: '1276792531262378064',
        webhook: 'https://discordapp.com/api/webhooks/1456705319316095059/RDtpCxD97icJx3N8oIMiGWV0P5Gk3-ucMK-F2t7N-bBK0Iz27JneSbCUyEfAam0CFR4d'
    },
    
    'odds-juice': {
        channel: '1352721050395217980',
        webhook: 'https://discordapp.com/api/webhooks/1456705376421548204/fiP9Lt5kjT8JJAhGsgAKgogEzPIxuFg7Y9gbzfcZMBynR8X_MumTGViIwtGqfXTJfjdq'
    },
    
    'official-x': {
        channel: '1423801142902652939',
        webhook: 'https://discordapp.com/api/webhooks/1456705568021418117/6NXd_9gJVSEjEHeLlifDYDaREV0NKOFQzMjhA4AuoDzPJfN0lQFVrBLUyrhTzSozVo3a'
    },
    
    'prop-geek-zeke': {
        channel: '1405285638101536788',
        webhook: 'https://discordapp.com/api/webhooks/1456705704680362138/tOT_oaLvl72YFX3fz91GIvUJLKRSCZ9B3ypvp0FyUyNoQ252qgkT-u7G94p5Iypdf-yX'
    },
    
    'skohty': {
        channel: '1400019884871778344',
        webhook: 'https://discordapp.com/api/webhooks/1456705775790588230/0B3jZXUZ8u5bmspy9HskhpH1aa_DzIdBcpB-G7pVqUMio28v7PPl0RjNy9lCB2h4yfwe'
    },
    
    'stoshpicks': {
        channel: '1351004359428931654',
        webhook: 'https://discordapp.com/api/webhooks/1457428747358568449/m3rsBhWvKQKqDLoYSgg-nJ1tMFQ7vRMPWD8OtawT-YhXdUJPANT_FlYBDDTxKY0JIocE'
    },
    
    'vicelocks': {
        channel: '1411342540027990197',
        webhook: 'https://discordapp.com/api/webhooks/1456718758864228374/oPeDbNBbmNnNtddQ_erjJ5UuO70nhsFudp86heh9saK9SLNR41nU0iR8-FpLymIhg7LZ'
    },
    
    'wizard-zeto': {
        channel: '1307059938501328916',
        webhook: 'https://discordapp.com/api/webhooks/1456718808759664650/S-TKesdAs98-zNkd556sUJBGD76Cm7_X3MBbRkVU6nvvEmVo4kOWwZB0LEdR9jUkg-D2'
    },
    
    'yun1manny': {
        channel: '1415439802328678440',
        webhook: 'https://discordapp.com/api/webhooks/1456718858613162174/WOwnkx_zjDRchGBa9fD183wNo-c5Sg33VpmIiOhKiszOWqVoaqyqOdT-22xLjA2qCCJp'
    },
    
    'pickfinder': {
        channel: '1455445295432339589678440',
        webhook: 'https://discord.com/api/webhooks/1456718914766635232/minc5R8CGhOXZcKfUYT6b8PBf0kxEH6D_unUhKztHfxd7nuU_v4m4yqCnm7bsftl_qo5'
    },
    
    'angeloprops': {
        channel: '1445472804228300883',
        webhook: 'https://discordapp.com/api/webhooks/1456718958685196574/pt6biKtKzUkupeD2U6IuEgxegaIsuNJGlimxEBQKtsfbhbpoLdfRelhG8voRenNtXBQ8'
    },
    
    'bankdolo': {
        channel: '1428460585502113792',
        webhook: 'https://discordapp.com/api/webhooks/1456719014385549405/GeBsmZNo8ECZGJ9QU7S9_Fno9ShMVHLQClOaCgZ30lK6pSbMpuJkSFCHTnjA9QvwFHm5'
    },
    
    'coverkings': {
        channel: '1412456151932735498',
        webhook: 'https://discordapp.com/api/webhooks/1456719094047969402/wbsSBzEhit0qZ6cx5ZLw-5PlVKXM-W0bU0s2g-z03BL7ZLyaX43UWEun8ymUDCUdnAUE'
    },
    
    'cliffshredder': {
        channel: '1288744122647052299',
        webhook: 'https://discordapp.com/api/webhooks/1456719147961421875/blsVCclRDCajbzF3CaCxHNqG2o7hw8pOdM5wR82Ky0pB6lfUKclQU1Z93-gg-hJD_Qgg'
    },
    
    'moshi-tennis': {
        channel: '1366628285819388048',
        webhook: 'https://discordapp.com/api/webhooks/1456719219751387136/Z5kJ-j9BkMLLBl4p8CAue-Q0KyM7NFSpZIiDIT6F2Fb8x0GjqnoHpA8KfNLWPFvtEwfJ'
    },
    
    'racha-mods': {
        channel: '1395127687026053230',
        webhook: 'https://discordapp.com/api/webhooks/1456719259857064106/GRVogPzI_fGiI4XFFDanf6pg7vxhC-W0mH1uKEfQg8Efq1JGIG-amhOsCbljlF0xIzbo'
    },
    
    'ttc': {
        channel: '1395127687026053230',
        webhook: 'https://discordapp.com/api/webhooks/1456719302836224031/cNZgQ3QlQ6tizL2dKMi7ljJLKCb91bs0ogQ-1pCN35tGisqjMFmKOsqOLzBKqanAnRLw'
    },
    
    'sneetch': {
        channel: '1423915918924185722',
        webhook: 'https://discordapp.com/api/webhooks/1456719349938262188/IOiWqQDfQ8yiHE9K4ggaEAuAnHhjA5aYDBEtMTekazD7j-cdp4qbr62lm5Y8Q2L5OUZx'
    },
    
    'swift-nhl': {
        channel: '1295615435298967673',
        webhook: 'https://discordapp.com/api/webhooks/1456719389880483860/s5HUrnzC-WnwOQr2zMZU-vD4wuQfTuM-XQivnJst8LgbAajGVUZZbj1F3i1GmCV9nRDa'
    },
    
    'vokey-pga': {
        channel: '1366625719769366620',
        webhook: 'https://discordapp.com/api/webhooks/1456719448621842433/tyo2oKJwPycSccILAPVNWZQksYB1w8oVd--TMwHzR7YTj9W0F9Tz7gZMEKu_cR6_roAp'
    },
    
    'xclusivepropz': {
        channel: '1193771774106677359',
        webhook: 'https://discordapp.com/api/webhooks/1456719669867188490/V-jZGQhSQkx_PDD2QHtfwOMTSvPE1jf0qn-AtPXarUasq3FCTdayUl5TT08oGAfnbyVw'
    },
    
    'wyzebets': {
        channel: '1445472623063597087',
        webhook: 'https://discordapp.com/api/webhooks/1456719720156893398/bf43kODYrQbvr-XGnf6kdUFpeSKKiZh3VAQkmdY-pSaEHnbj9Ye8svzR6eqQZYoqrfal'
    },
    
    'cs2-models': {
        channel: '1207556015013236776',
        webhook: 'https://discordapp.com/api/webhooks/1456719785692889130/wE3rj7qq5FhmJ2ZYk0YPttP6QtQ6JTOrkychZs67etebH8SL17260Ub3f7_qfe0fLSoq'
    },
    
    'lol-models': {
        channel: '1276087639602364427',
        webhook: 'https://discordapp.com/api/webhooks/1456719828026134643/xeGyEX7hw5iNCxrvPWqJwWzjPAFsjq-uXz8CVBQCINSNdWClgD5S5_wEYRR8IgSZRBv1'
    },
    
    'racha': {
        channel: '1294096228212150332',
        webhook: 'https://discordapp.com/api/webhooks/1456719870501720116/aerdCBujtsnUGMJJESgesi4ILC25DMg019xbsHWebfqU1CL5Io5bMWZIRuEiUFQ6pGDj'
    },
    
    'hydro': {
        channel: '1390535174277697556',
        webhook: 'https://discordapp.com/api/webhooks/1456719912105148519/M8qC5dIuE4RCbEVVrHMi2vLBFvr_SexGNcvjxeTVXsuLmbnfHW8zGpw7zjXlGQtRhyhH'
    },
    
    'ttimeesports': {
        channel: '1427899579369656394',
        webhook: 'https://discordapp.com/api/webhooks/1456719963892220103/JoVFxbORQytTkJfvUYpNyiYYX4nJE_R1oFVhKApJUQOL790kFORbe92hMwNypJ3u-k9M'
    },
    
    'cloud': {
        channel: '1238966987061727412',
        webhook: 'https://discordapp.com/api/webhooks/1456721887811076198/JmBGYZSGjSHflBZ8TZH-ivJ9efR7rbFbXhrTidcEnaxri9cHHgDr4SqWmkQVhBg1w-st'
    },
    
    'chipper': {
        channel: '1246709883399569430',
        webhook: 'https://discordapp.com/api/webhooks/1456721927551848656/BRMtlWi364W9lf4rjFgHD2M6Jgu_T6JbjXb2vgBh1a2aqiMmjQV839-ar6CLH4MgU9QW'
    },
    
    'ultimatedfs': {
        channel: '1440441022000660643',
        webhook: 'https://discordapp.com/api/webhooks/1456721972087099550/6BVJ8pVmYC7o9b83oBj--Kls2gIKumLhXj01nD6-F17NdMhyEXOCcBIrJjbbeyJ2Fazz'
    },
    
    'draft': {
        channel: '1215707593503285258',
        webhook: 'https://discordapp.com/api/webhooks/1456722033521070276/MQa1u5TeNDSIntZ3UNzLYzaVNxSfN0THBf-QNUqn63bHtWpCgt_FfZNpnya41k1wsSQm'
    },
    
    'qlocks-dota': {
        channel: '1390588863189356565',
        webhook: 'https://discordapp.com/api/webhooks/1456726157394444462/S6LIYrgdsFYRH5evPtGlAq8mxgd3p669027-6Lj_eIGun1EoHZlDW2a5uAwc6pN99eA_'
    },
    
    'racha-esportsmods': {
        channel: '1366626195160039464',
        webhook: 'https://discordapp.com/api/webhooks/1456726218916495391/DrRGtStkW6M739fOM40H7ZBcsBt6SeDs_TEaDaa-QZS_7wgPh0_Pjw6n04jbQyFG8zac'
    },
    
    'esports-others': {
        channel: '1238228099653701663',
        webhook: 'https://discordapp.com/api/webhooks/1456726279196774522/LfvYNI_fJzc1lPAE4B6cCHiScAEpnJlKDJo4aFhOcdtcSEKhhUhjY1F-fBxgXxR7J9bK'
    },
    
    'hydro2': {
        channel: '1339712943142469755',
        webhook: 'https://discordapp.com/api/webhooks/1456733600425836610/K7M8-L-T0mpvpLXqbDbbekJRYq2xFrF_--SW6-Ru6f0fAZbNZigxlH5aXlOd4lqmnIGb'
    },
    
    'rezerise-cod': {
        channel: '1340084861674979379',
        webhook: 'https://discordapp.com/api/webhooks/1456733644092608542/53yOOuqWW-rkAzL6zwaeRLMvkwvvTzKMfXZB52l2ykmEEU-LIoSF1LX_weIRvwgJX3U_'
    },
    
    'dreams-val': {
        channel: '1390535994893140149',
        webhook: 'https://discordapp.com/api/webhooks/1456733704813674721/6duplguYvOJDvCU97StnQc9iqZjf5qW_RXtmgkwre29NLMIojPEWwXEb66pwUokq8Lkd'
    },
    
    'luci-cs2': {
        channel: '1390536121028710442',
        webhook: 'https://discordapp.com/api/webhooks/1456733757670297822/9rdx6C5dcxXRTLnH-5hFFi5t0pw0atiq664qgtaGbUA4q4SlwbnMjZvJN6QHyGxei-fi'
    },
    
    'gas-val': {
        channel: '1390536192746983424',
        webhook: 'https://discord.com/api/webhooks/1457440416671465533/j8etczOWMHynHXnt2QQjP8GiqgISDSeoWSCh0FnOy0qEeezhptJr9I97vGxvlx6Ajmi1'
    },
    
    'wizardzeto': {
        channel: '1381149393264185385',
        webhook: 'https://discordapp.com/api/webhooks/1456733922439463085/GtStFeXd55Z8bzFiFnhChTM94jOktpt4H0jYdC2w0BA16oMPGSQNdqWxEIs_Y-XqBqHr'
    },
    
    'triage-zetomod': {
        channel: '1307609104247947274',
        webhook: 'https://discordapp.com/api/webhooks/1456733963014897717/2cP3ADzuyXd6QEpGsBlgIzucandhHSSGz-PXaOQkzKVzp-FaKdDhlUrqIHvbZXPInWAx'
    },
    
    'wizz-zetomod': {
        channel: '1307609134262124614',
        webhook: 'https://discordapp.com/api/webhooks/1456734010175656090/-Asp86kHkldqv6I07Z94egLSKX-0wdcwq85x_ZUURt-jZhoNBmmWFE9WoAHhWb-tMgf1'
    },
    
    'rizz-zetomod': {
        channel: '1307609235647107124',
        webhook: 'https://discordapp.com/api/webhooks/1456734074914738218/ryvgi4-X4O8P5Qp0AFLPxliIvoJlZ8btGaT6trvV1iPkpVL2a4CzbCmh98wnJgvPNaah'
    },
    
    'chode-zetomod': {
        channel: '1367763539392987248',
        webhook: 'https://discordapp.com/api/webhooks/1456734119663763531/dCwtcMjCOv5z8T_sUBVk17OHJiY90KZ3IlLoHMocYJ2nJvzkUQbJ0y_hkI7s_V_jrQnn'
    },
    
    'ivan-zetomod': {
        channel: '1374270381707366410',
        webhook: 'https://discordapp.com/api/webhooks/1456734171220148328/4N36l3dm-YsUdhHQSQCwiwbkB09SMvSfkWZ_CscpUsw2vr1OwqoMtnddI15DberO68Sx'
    },
    
    'wctspark-zetomod': {
        channel: '1400023430769672275',
        webhook: 'https://discordapp.com/api/webhooks/1456740381847716085/nk0S7lCL0Ert267kTWAslTPp_GBUdSFXnd8OpjDY--S3BNwUkFJsxWokKxTldg8kiIvf'
    },
    
    'frhuh-zetomod': {
        channel: '1409684004566728724',
        webhook: 'https://discordapp.com/api/webhooks/1456740447987695637/z6Vh-gwx9y755PLG4q8pXbYpVfiiq2TYbfnFumIq0DIob6uUoqLrY2MF54Qy7mfWReZs'
    },
    
    'trial-mods-zeto': {
        channel: '1409773690090164274',
        webhook: 'https://discordapp.com/api/webhooks/1456740496402681998/mC4HM3eyBQ68XSoDjspnlyTWORJjE27LxKLPDt-Sa82PJ3Rwjjg4DaSGWJifiPFOAwgg'
    },
    
    'trada-picks': {
        channel: '1374069312998080684',
        webhook: 'https://discordapp.com/api/webhooks/1456740555991154815/er4QQ0AnQHQJaRy32G6NapzuHUWNz_rBKXcTf_si0DHuMnjkbFA7uhDm63iBx1IfKyet'
    },
    
    'true-tradamod': {
        channel: '1374133367401877624',
        webhook: 'https://discordapp.com/api/webhooks/1456740607962906646/BLFGgLzM_sGxhwCH2IXM-Sfqq8iWFNgiuxEANqtpvJCcL-4lydRl4RndP0q4gCgVaaMn'
    },
    
    'ant-tradamod': {
        channel: '1374133432652922880',
        webhook: 'https://discordapp.com/api/webhooks/1456740663621062798/hoXWXmvkrzM2ORaDtVrLTF3DBq0LTvSo3Yl7lvzjznFK3vjb_jUmd_quWS0H4tOGxDq8'
    },
    
    'spiral-tradamod': {
        channel: '1374133527867555950',
        webhook: 'https://discordapp.com/api/webhooks/1456740729744392203/BkCucfaKMY566jtTlOziy2iJAysLdodA_Q6dqXCextmV40C12wnS4JqxXhCHhyTf5LZB'
    },
    
    'maddex-tradamod': {
        channel: '1374133580007215224',
        webhook: 'https://discordapp.com/api/webhooks/1456740785486696601/4tfmoWhAqx20ocYSoSGmQeqp2vED1hNJFlwdmyTQUSAjVoBx05v4h0JB8-7g6ecwDCIl'
    },
    
    'zzz-tradamod': {
        channel: '1395125417324707871',
        webhook: 'https://discordapp.com/api/webhooks/1456740843804164340/DJdzHlvIzZso4lRcpmdRkT6SIBdVCd-6p5P78PKCuvEtoYixrOP0jS4G62fRUeyu91on'
    },
    
    'pizza-tradamod': {
        channel: '1395125473465598023',
        webhook: 'https://discordapp.com/api/webhooks/1456740893112406038/ghIGRBy0-oRLnmEBfWS1QrBM8GczzrOEhHsSBStt4vyXblEACqAhGIogyxP7btLps6-s'
    },
    
    'furnace-slips': {
        channel: '1303839051111071754',
        webhook: 'https://discordapp.com/api/webhooks/1456740939266658568/PDHXwTwOYqh33TUX51hMJX5tDYjF3-rR4g5FtJHavRDKp5a-sFPt7I6DRJ3oKBzNAmc3'
    },
    
    'nba-models': {
        channel: '1303839380057882667',
        webhook: 'https://discordapp.com/api/webhooks/1456853891244232705/MtGRyu_jwjn69sS3JKFksp6CpAmr3e-YzQ1aqgSJ_cCygtzut4N3CVlMi9x87PPBdfm_'
    },
    
    'nhl-models': {
        channel: '1303839436634591232',
        webhook: 'https://discordapp.com/api/webhooks/1456854054742524027/8QG3tAL3Ar5p5vqVp8GqjI_8wA4pGlSQkHVDqKLd70A_RameV53x1vhPVmhWl5JaeAhA'
    },
    
    'nfl-models': {
        channel: '1303839657855025242',
        webhook: 'https://discordapp.com/api/webhooks/1456854112015618181/qv73mNq2acuvpqjs63P-C3tpvX7sbb8TFtVy1OXTbAsELeERZG5LP_RKTdY-9fbtRiTV'
    },
    
    'ncaa-models': {
        channel: '1304156447541559439',
        webhook: 'https://discordapp.com/api/webhooks/1456854159117521057/YPtQAzEnLD9tpq6ymFXqE3Lo4RvEAWRPMUMRMbdqipy8OSnyIF0gRDTQJ7AFhh9bC5jL'
    },
    
    'mlb-models': {
        channel: '1303839698472665108',
        webhook: 'https://discordapp.com/api/webhooks/1457425692491780116/qv7MdRudHub5Ty5-7AophKvCJL0IgYBxYwLfNEv-LOcbzKG54uW6_o4rFXK_eJ_glKoK'
    },
    
    'wnba-models': {
        channel: '1352716804727767141',
        webhook: 'https://discordapp.com/api/webhooks/1456854207243092030/-30UWFSVFbrB1LdcT7bZxJqp6IkEIaaEnrc957Er1EW3hDoX9iGCFXMFiix4W7wk3vmp'
    },
    
    'free-leaks': {
        channel: '1259695892257308763',
        webhook: 'https://discordapp.com/api/webhooks/1456854304395628705/TlShmklTnX7DbvIoNWMz9nKPT431heIuklnTgjHMh_eaih-JwOUQCdPyowAE_UdANOZW'
    },
    
    'weezyprops': {
        channel: '1360396967670452396',
        webhook: 'https://discordapp.com/api/webhooks/1456854356916830289/IdkobPbJJNLKKGdtR-GWKvmpKDYHI2K8DORpeyfItT1hPQy5csSPLFOeQK5ibwjZI95X'
    },
    
    'zoldyck': {
        channel: '1360394096102867144',
        webhook: 'https://discordapp.com/api/webhooks/1456854419286261812/NdTfihLISIHJboxEc-rYfffCmO2Sf-IEYm0MYrheMTCe8F-YYmsz1mDI6fy5B87NsSBX'
    },
    
    'camsoicy': {
        channel: '1304156637216379012',
        webhook: 'https://discordapp.com/api/webhooks/1456854473153581232/t8NNr7XaZ2u3eK4PHCKG2EHGM7B1nmokBR3FpcXxEwaf8iXAYUq0sXVJ4APqwYuyqWt2'
    },
    
    'alexcaruso': {
        channel: '1214596556301271121',
        webhook: 'https://discordapp.com/api/webhooks/1456854632826404864/sfDrfCku2kuXResuCM_cDukcDnZeTDLHbU3pUnMgBFHkFdd86XUUMhRGuC4i16kNQW9t'
    },
    
    'austinprops': {
        channel: '1302167790140260393',
        webhook: 'https://discordapp.com/api/webhooks/1456854695397167286/RVPK4zhvizqOQZf_KgssK7GFvRD3wxDYDCmOtMapuJNPlHR-l6fRFyXW_ZTIxoz3Nu-3'
    },
    
    'fadegod': {
        channel: '1243297002624647251',
        webhook: 'https://discordapp.com/api/webhooks/1456854908174078107/buvu5vzI-Zd3NDU6SxDYdRRbv6_4Q1EMjuwe4R_XeA4W2dBqqVyvm4huhLndjAIG4QUD'
    },
    
    'prizepicks': {
        channel: '1276319611012386858',
        webhook: 'https://discordapp.com/api/webhooks/1456854955259334656/ONnX1jJHAAHAgWLK3w87mLOKGVMfPeZtPBEIuH_4Y8_SQUC1XuyY3g8Y0gIy_ZEoHvNk'
    },
    
    'underdog': {
        channel: '1276321333818691706',
        webhook: 'https://discordapp.com/api/webhooks/1456855797551337495/aaR2-9cq7xJMMWpaIWk6e0aSUg5n5l-OPwcnIpa-t5ZdlWDbsbzVbNQB6WA72C7KEy8e'
    },
    
    'nba-updates': {
        channel: '1237464328798732358',
        webhook: 'https://discordapp.com/api/webhooks/1456855868871016448/EsLrKwWrWA-P4JPFOUmihonq4oR1xUyqszCHP_xM-THYd9K_HZK4lHORFcEc6kQQKqRl'
    },
    
    'wnba-updates': {
        channel: '1237896640485003376',
        webhook: 'https://discordapp.com/api/webhooks/1456855918619656345/CSdzMqDvngRW2fVKvT9F9if1kYjqaCPHwS8mttf_1aw_1iNmo2YcbU8RwDpkKOMkeWbp'
    },
    
    'nfl-updates': {
        channel: '1237464993214234707',
        webhook: 'https://discordapp.com/api/webhooks/1456855993303433319/hp4QeispOfklphPKC6UYTF9nTEgmzRf1HVIdPGWtK-yZPryaIdoEhoIJImbewdb_MmWj'
    }
};

let isProcessing = new Set();
let processedMessages = new Set();

function cleanContent(text) {
    if (!text) return '';
    return text.replace(/<@&\d+>/g, '').replace(/<@!\d+>/g, '').replace(/<@\d+>/g, '').trim();
}

function buildPayload(msg) {
    let payload = {};
    
    if (msg.content) {
        let clean = cleanContent(msg.content);
        if (clean.length > CONFIG.MAX_CONTENT_LENGTH) {
            clean = clean.substring(0, CONFIG.MAX_CONTENT_LENGTH - 3) + '...';
        }
        if (clean) payload.content = clean;
    }
    
    if (msg.embeds && msg.embeds.length > 0) {
        try {
            payload.embeds = msg.embeds
                .slice(0, 10)
                .map(e => {
                    let embed = {};
                    
                    if (e.title) embed.title = String(e.title).substring(0, 256);
                    if (e.description) embed.description = String(e.description).substring(0, 4096);
                    if (e.url && String(e.url).startsWith('http')) embed.url = String(e.url);
                    if (e.color) embed.color = Number(e.color);
                    
                    if (e.fields && e.fields.length > 0) {
                        embed.fields = e.fields
                            .slice(0, 25)
                            .map(f => ({
                                name: String(f.name || 'Field').substring(0, 256),
                                value: String(f.value || 'Value').substring(0, 1024),
                                inline: Boolean(f.inline)
                            }));
                    }
                    
                    if (e.image && e.image.url) {
                        embed.image = { url: String(e.image.url) };
                    }
                    if (e.thumbnail && e.thumbnail.url) {
                        embed.thumbnail = { url: String(e.thumbnail.url) };
                    }
                    if (e.footer) {
                        embed.footer = {
                            text: String(e.footer.text || '').substring(0, 2048)
                        };
                        if (e.footer.iconURL) {
                            embed.footer.icon_url = String(e.footer.iconURL);
                        }
                    }
                    if (e.timestamp) {
                        try {
                            embed.timestamp = new Date(e.timestamp).toISOString();
                        } catch (err) {
                            // Invalid timestamp, skip it
                        }
                    }
                    
                    return embed;
                })
                .filter(e => e.title || e.description || (e.fields && e.fields.length > 0));
        } catch (err) {
            // Silent error
        }
    }
    
    if (msg.attachments && msg.attachments.size > 0) {
        let urls = [];
        msg.attachments.forEach(a => {
            if (a.url) urls.push(String(a.url));
        });
        if (urls.length > 0) {
            const urlText = '\n' + urls.join('\n');
            if (payload.content) {
                if (payload.content.length + urlText.length <= CONFIG.MAX_CONTENT_LENGTH) {
                    payload.content += urlText;
                }
            } else {
                payload.content = urlText.trim();
            }
        }
    }
    
    return payload;
}

async function sendWebhook(url, payload, name) {
    if (!payload.content && (!payload.embeds || payload.embeds.length === 0)) {
        return true;
    }
    
    for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
            const res = await axios.post(url, payload, {
                timeout: CONFIG.WEBHOOK_TIMEOUT,
                headers: { 'Content-Type': 'application/json' },
                validateStatus: () => true
            });
            
            if (res.status === 200 || res.status === 204) {
                return true;
            } else if (res.status === 404) {
                return false;
            } else if (res.status === 400) {
                if (payload.embeds && payload.embeds.length > 0 && attempt === 1) {
                    const simplePayload = { content: payload.content || 'Message with embeds (embeds removed due to error)' };
                    const retryRes = await axios.post(url, simplePayload, {
                        timeout: CONFIG.WEBHOOK_TIMEOUT,
                        headers: { 'Content-Type': 'application/json' },
                        validateStatus: () => true
                    });
                    if (retryRes.status === 200 || retryRes.status === 204) {
                        return true;
                    }
                }
                return false;
            } else if (res.status === 429) {
                await new Promise(r => setTimeout(r, CONFIG.RETRY_DELAY * attempt));
                continue;
            } else {
                if (attempt < CONFIG.RETRY_ATTEMPTS) {
                    await new Promise(r => setTimeout(r, CONFIG.RETRY_DELAY));
                    continue;
                }
                return false;
            }
        } catch (err) {
            if (attempt < CONFIG.RETRY_ATTEMPTS) {
                await new Promise(r => setTimeout(r, CONFIG.RETRY_DELAY));
                continue;
            }
            return false;
        }
    }
    
    return false;
}

async function handleLiveMessage(msg) {
    // Ignore if not in a guild or if it's our own message
    if (!msg.guild || msg.author.id === client.user.id) return;
    
    // Check if this is a monitored channel
    let foundCapper = null;
    for (const [name, config] of Object.entries(CAPPERS)) {
        if (msg.channel.id === config.channel) {
            foundCapper = { name, config };
            break;
        }
    }
    
    if (!foundCapper) return;
    
    const { name, config } = foundCapper;
    
    // Prevent duplicate processing with message ID tracking
    if (processedMessages.has(msg.id)) {
        return;
    }
    
    // Mark as processing
    processedMessages.add(msg.id);
    
    try {
        // Get PST time
        const pstTime = new Date().toLocaleTimeString("en-US", { 
            timeZone: "America/Los_Angeles",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
        });
        
        // Show simple output
        console.log(`\n${name.toUpperCase()} POSTED - ${pstTime} PST`);
        
        const payload = buildPayload(msg);
        await sendWebhook(config.webhook, payload, name);
        
        // Clean up old processed messages (keep last 1000)
        if (processedMessages.size > 1000) {
            const array = Array.from(processedMessages);
            processedMessages = new Set(array.slice(-500));
        }
        
    } catch (error) {
        // Silent error
    }
}

// Create client
const client = new Client({
    checkUpdate: false,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 86400,
    messageSweepInterval: 3600
});

client.on('ready', async () => {
    console.log('✅ Bot is ready and monitoring for capper posts...\n');
    console.log('Waiting for capper posts...\n');
});

// Handle message events
client.on('messageCreate', handleLiveMessage);

// Handle errors silently
client.on('error', () => {});
client.on('warn', () => {});
client.on('debug', () => {});

// Handle unhandled rejections
process.on('unhandledRejection', () => {});

// Login
const TOKEN = "MTAzOTM5ODEwNzM1MzQ1MjU3NA.GW69Ky.x874MCxAkO-D_TgllIJct3c17T2iZMHswup5FQ";

client.login(TOKEN)
    .catch(() => {
        console.log('❌ Login failed');
        process.exit(1);
    });
