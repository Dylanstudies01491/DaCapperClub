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
    streaks: {
        channel: '1437563146888810577',
        webhook: 'https://discord.com/api/webhooks/1455928909861355582/TpENcorv0tc5qZYyPk6ywj9qDcmYI3PQtU9hL5hfW1FndkrPn0QkYOUkwhtcPNyEk1V0'
    },
    
    trackers: {
        channel: '1438179850086125779',
        webhook: 'https://discord.com/api/webhooks/1455928988802351208/voAyOAxJTkKqwZHqumcD0xozvXyvdHRt3YV3DgmnJ5B79yAmh-nBVSbmQoHeFcVcJ4KM'
    },
    
    'sport-tracker': {
        channel: '1442149411277770894',
        webhook: 'https://discord.com/api/webhooks/1455929133740855441/KeN6EmgYQVTLxD2QhWzodw8cfLIX4Nj2G55duFNgXpsGPGJTmDbThImH4cHGXGUEVWVm'
    },
    
    anon: {
        channel: '1433220270923055144',
        webhook: 'https://discord.com/api/webhooks/1455929324145217810/UtLBOzO2Gp0_Jon6ibiISdHkW6ptLJ4jbX7bcmwXt2wkP0_upL-ICgQYIapZQValY7j8'
    },
    
    monumental: {
        channel: '1433220272529342545',
        webhook: 'https://discord.com/api/webhooks/1455929400750248133/UsDISfUQjsctas7B1_gL4HabxlxLZJxA2cCKdKzqXvyIaDlDM-EOIDCTTZa7E_6xV6wU'
    },
    
    mrexclusive: {
        channel: '1433220274383486996',
        webhook: 'https://discord.com/api/webhooks/1455929472846139556/Nj61rYMKed5BKAOA2f6OcZYp55oDv4zNJmY6B6jDIXsNaXccyybuX9s2oCTIR1ai8NmD'
    },
    
    cesar: {
        channel: '1433220275604029560',
        webhook: 'https://discord.com/api/webhooks/1455929519847510106/tgl6E3xguyurEcZA23bQfjZ4gMYeFwD_deuifpj4VNLKzTFupHmVbj1NngszjfGWp048'
    },
    
    vicktuff: {
        channel: '1433220276862193684',
        webhook: 'https://discord.com/api/webhooks/1455929592110907395/dvBsviexYgnnqDETiPvjXJXNAwvw0kh5oAURF-yDJb7N7xXRqy9OxMVl6LSpq0mB2xXh'
    },
    
    uatb: {
        channel: '1433220278640447569',
        webhook: 'https://discord.com/api/webhooks/1455929655814131732/QN1bwZBWHNq-c0xr2r-PIGFEfpObup4GCTAGCHbiI57maFrlzgOBWOUQGiA0rL269QXL'
    },
    
    q9: {
        channel: '1433220279684960336',
        webhook: 'https://discord.com/api/webhooks/1455929701301489726/0bhaJ7T3V6dZ4wGipogj0YjWrULxJPd2GIEvLhKJxtrvjY0n7hbmE7x3Zmd8Rs-K85Zq'
    },
    
    fern: {
        channel: '1433220280729337957',
        webhook: 'https://discord.com/api/webhooks/1455929752090312920/4oRaC6tENfJXBuEKuZ4WvfsvaGzYe0Wb-BZxO6TB2aD-sWjxuWkWtAJkB41O0mqRRJaR'
    },
    
    ampm: {
        channel: '1433220282201542790',
        webhook: 'https://discord.com/api/webhooks/1455929809321332883/BXfdDzHzLYDDM3BYz36PegtPo039II4vo4azpAzhMIMXKXHJwy0A1cp5XcxrBjLNUrOf'
    },
    
    laformula: {
        channel: '1433220283594047600',
        webhook: 'https://discord.com/api/webhooks/1455929893388025897/wcsY_JHaDR2H_9Mi0YAdvMqufKoCY1lBIuXeowk2l2QtW4neJo3z5QXrZ_NqXRURx8N2'
    },
    
    lsw: {
        channel: '1433220284986429512',
        webhook: 'https://discord.com/api/webhooks/1455929941039386899/1Z6rYHB1lRdcA5yRirVhaeHg8qEESHiGGUGzQb1aDM1rJSbNgFhiaWyGBvClaF2F6Apo'
    },
    
    fivestar: {
        channel: '1433220286953816064',
        webhook: 'https://discord.com/api/webhooks/1455930004130238567/HWi5rw0Uhr9lmmwJHTema8QNe-cYed3yGu2Dc1S_7Dp2WU3fYQdhDwQZW8VTEJYIr8J_'
    },
    
    ydc: {
        channel: '1433220288270696600',
        webhook: 'https://discord.com/api/webhooks/1455930047360798802/JKqbJfBycoVqcpYLIUeDWHFqWOeKsaX8WJkcaH68EN3nFeN1eRUY6rqLrq24W7cvgAjC'
    },
    
    sportsbetking: {
        channel: '1433220289638039686',
        webhook: 'https://discord.com/api/webhooks/1455930083574284389/ydGtXq4BBcKNuYIHO45t34HF98xrmaQH0_yTgV0ihIf_k1h3ubAxoflE2Z_4atN7E4Iq'
    },
    
    afs: {
        channel: '1433220290917171292',
        webhook: 'https://discord.com/api/webhooks/1455930155326504970/0CvHr8SXrBxLPiPpPKNfJvqF_b1irhQhG4CznsyULbuy-MWDG4xXDS0T_b33BRetZIH1'
    },
    
    travy: {
        channel: '1433220291936649227',
        webhook: 'https://discord.com/api/webhooks/1455930204865429545/iLCy3_sA7j6ZsthFruG3QQuFT2PDNcwbPY9QeusE8f7_l7sRgR3D7rAuwy_d1aNYmInl'
    },
    
    ab: {
        channel: '1433220293392072828',
        webhook: 'https://discord.com/api/webhooks/1455930248133607455/k9jXB1W76OQ8-1dQEBQC3Q8AmjBTrm5Fo5u47lrHI-TBKstO1tXnjw5wjfOnYKtTLSjj'
    },
    
    platinumlocks: {
        channel: '1433220294826528930',
        webhook: 'https://discord.com/api/webhooks/1455930301770629241/lYooMVnHZ-jYFVfjodqxO6tXafhUxUEbgWVyeVaUGtxTGaFzVkbRnX9evL5ZtjyhkWuc'
    },
    
    razzaqlocks: {
        channel: '1433220295799607357',
        webhook: 'https://discord.com/api/webhooks/1455930442820751586/Wpg186U_vrRa0WHKkpnIwpqf_93on3az-5V70sYI4HjGr09RS1NkT8ZWTh2U1UZT_4tT'
    },
    
    midwestmikesports: {
        channel: '1433220296860762112',
        webhook: 'https://discord.com/api/webhooks/1455930487758651566/4uxs1xh2AY7UP1zppIjb27VnSax7zwxoCN8zUl0gLHt2-A0dZMEOk4Eh7j8_9Xw6KOVd'
    },
    
    chamba: {
        channel: '1433220298655662210',
        webhook: 'https://discord.com/api/webhooks/1455930651009089698/7yXUOMSY9H-Jx7XVSHJxYJdeJJpUKJ5SLlSu6OAHe44zQx9QbmIs00P5rKlpgJFdgR-L'
    },
    
    vegascovers: {
        channel: '1433220300035854515',
        webhook: 'https://discord.com/api/webhooks/1455930790905905173/u4AmH2-3wWY26QCe1312mM8Xe7RYjxKq4N4dCyOsjHiuvRgzs6H1e2FUfwxEdM09810e'
    },
    
    a1: {
        channel: '1433220301327437835',
        webhook: 'https://discord.com/api/webhooks/1455930843984957491/3iQZWubIGXpry1O1YCfReUUrFym4J4QgjcuqR4dQEeyOTSrrmOP6_EKdJm0BuY5vM7xW'
    },
    
    jacavalier: {
        channel: '1433220302577340589',
        webhook: 'https://discord.com/api/webhooks/1455930883088584817/eQ3nuGWCrZAJ_nGO_SwX_XD_q_NyZ_D5ZnkoeXkfWE3Zpv8xdnjJZ5cpnII_vxS2bX7y'
    },
    
    ronaldcabang: {
        channel: '1433220304007594125',
        webhook: 'https://discord.com/api/webhooks/1455930942932914220/3ZNmXVgwnreHUv_GIHiWxKqIX88BJh6klH-fhQ1VZELHmnorVDsycnlRagkfaI7HmyL-'
    },
    
    ruso: {
        channel: '1433220305278730250',
        webhook: 'https://discord.com/api/webhooks/1455930980887167110/M3IMU7uoN3epOolXd_w05Ejyfo9ZUPM42XOabAupEDD_Ly8BWioJzLOGwNTIMXOehWoH'
    },
    
    falcontpk: {
        channel: '1433220307220435045',
        webhook: 'https://discord.com/api/webhooks/1455931030186754049/LS1bF6IfXILazoAlUmxv1aUHCfsuYRY2ZpNo74Z-XG5chxR6m28aBpdftapAH8g6K9dr'
    },
    
    fmb: {
        channel: '1433220309175111740',
        webhook: 'https://discord.com/api/webhooks/1455931139171815467/gzO0W6Jye0GZZ795H8YUKXFAomgaZa54sH5xclKOahFN_oN5CflxzeFsdxXv3pCMg-7h'
    },
    
    vonn5: {
        channel: '1433220310580203691',
        webhook: 'https://discord.com/api/webhooks/1455931186886086669/dlJh4N-D5rUFtL2UImN0pHLH_NZx1BDh9PvqprYbPPm3hZOIyEmoHR2QqW0-XUbkUV78'
    },
    
    kingcap: {
        channel: '1433220312178229329',
        webhook: 'https://discord.com/api/webhooks/1455931234407420107/R5fCVKhiqPGg8CUbyrXjP2fpkMTiLr38ACqyKKOJU5aRPtTT0PoVQ4OC9dXVv6JUOO-j'
    },
    
    listrill2x: {
        channel: '1433220319027658883',
        webhook: 'https://discord.com/api/webhooks/1455931290896302091/DgI8TC0Oh2gZhHyZqHtQyUkE9lz6b6GAqXHK22DP9x8dcsg4SzYjM9HsgDzNTUQbuu2R'
    },
    
    skinnybets: {
        channel: '1433220320231428196',
        webhook: 'https://discord.com/api/webhooks/1455931352699371632/MBYth_wxJ2xDz0RCL2jE8JX8rM-58IQjsKCoCNx1g5dZC1gHNUdc3qVMCx_THiSCPqUQ'
    },
    
    mazi: {
        channel: '1433220321481326682',
        webhook: 'https://discord.com/api/webhooks/1455931392897585328/XjOYR3UlJKwspxIpnoi0TsgmA2MCXcJ2RBf1H5jTyql9qBpIfiqCY-ec5gkE6bxc0ech'
    },
    
    seanperrywins: {
        channel: '1433220327889960960',
        webhook: 'https://discord.com/api/webhooks/1455931554411970601/4_E_E7TPoOSJU9Xnwvps2ee6F-lK3iEOpl6XhSt0u1iyMTRAqN7tFy_mr2o5uju_1OVY'
    },
    
    tms: {
        channel: '1433220329458761748',
        webhook: 'https://discord.com/api/webhooks/1455931624368771194/Gu579LZ2waypdHRS3GOsrYY_qffkKAeeUMXkDklgzJe98PA0p4ZBaymWkCCVobjGljvm'
    },
    
    dormroom: {
        channel: '1433220330587029514',
        webhook: 'https://discord.com/api/webhooks/1455931683747401862/hTCYIcNSyWl_sVo2Th8sdKk3BG731wpTadCGniB2xg4T9UjGlr4ZRgzgqbonIYcIpKwR'
    },
    
    brandontheprofit: {
        channel: '1433220269815758848',
        webhook: 'https://discord.com/api/webhooks/1455931726034501736/X-tPBmZDZ3k2Yl55-w33K91uwUJltkVid6-ZEUwUnQ9ZMg7AdpNF5jqiMKbfUvbdFFOy'
    },
    
    patspicks: {
        channel: '1433465894834536581',
        webhook: 'https://discord.com/api/webhooks/1455931768166289479/8V561lf_qD04nJQHi_Cb9R6ijiuWWQVAAOdsO9jpdH0Cdd8uVP_cfMSUVcaiMdTCXmb6'
    },
    
    pickzhub: {
        channel: '1433220332227006604',
        webhook: 'https://discord.com/api/webhooks/1455931837678358651/bZNRT30asjLVZxYRo-aI7_icAk4CCLEjCPd03zFmcpigSbaoz_gvWdNgdMHFoWRdq2Zq'
    },
    
    rickypickit: {
        channel: '1433220333611258039',
        webhook: 'https://discord.com/api/webhooks/1455931905571815572/3tj2LhWKjKyR2SuUcI5HCAA7tt3q6BnBVCREFwmK9fF8B6ccRwcIULhPaJV5uvz14SAf'
    },
    
    provenwinner: {
        channel: '1433220323041611878',
        webhook: 'https://discord.com/api/webhooks/1455931948760436860/rGY2M0AbmptFMsdSKiGSj-4kYAsVYCvf7BQrHLTQc0E-TrD7AeBGE-gL8EP0r-gH4jyp'
    },
    
    bulliespicks: {
        channel: '1433220325218324480',
        webhook: 'https://discord.com/api/webhooks/1455931986865688687/io8NB_SHoMIbBPGGisuY7HZyvk3FJgSHc2E9pQktbZbdciN9OVbYN7G7DiXNuMgZcR0N'
    },
    
    vegasmira: {
        channel: '1433220334882132171',
        webhook: 'https://discord.com/api/webhooks/1455932034542473388/7DA020X2t3BEUhbfB7d_vPjQg_HeBh-ntb1Cq8tVLbhVQ8r_1yUT8-vJ39fx56c1DejK'
    },
    
    kleos: {
        channel: '1433220326694850580',
        webhook: 'https://discord.com/api/webhooks/1455932079253491988/c4915UoHB9XDP0K8ToRgquIFnD_S-FTtTQAnvA3hKVG7E6bcWc6CJrBq30tAaSVpZHaY'
    },
    
    stuntalot: {
        channel: '1450090957260197888',
        webhook: 'https://discord.com/api/webhooks/1455932117862191125/rp-IquAeSRBy73V_YzTGhP4Z_PsBizqlCLzt4ttMUaAdhcswxsQ3-RC6rYvZmI9bfpm_'
    },
    
    outoflinebets: {
        channel: '1433220336333357076',
        webhook: 'https://discord.com/api/webhooks/1455932357868650692/qJ46TU1VFVE5VF93tlcd1OzzoxTUS3qPsf5LSnncSKnBzBR-3QQoE6zuVvmktsbNkwaP'
    },
    
    returnofthebiga: {
        channel: '1433220337734254693',
        webhook: 'https://discord.com/api/webhooks/1455932396728881418/Y7mgDKOSMcydvWiZEPgulO8hcTGVRdd6mAMXWbVyQNSr614-JYoH72gkb83VlSrySo6D'
    },
    
    'brandontheprofit-2': {
        channel: '1433220338921111683',
        webhook: 'https://discord.com/api/webhooks/1455932442127892564/BPJ3Ub69vry63bGBYcZg3PD1D3Hxq4m45PtmTo-lWVLi-Tbx_8KsIG6ruutdynBP3L98yea'
    },
    
    analyticscapper: {
        channel: '1433220340162498713',
        webhook: 'https://discord.com/api/webhooks/1455941167949807627/tOlSfi3vsdr1tcDijIfw8iKhBSmux6LS0OO5kKO9uRRpCnFdysDDua4ygbCIBdmYlP0o'
    },
    
    mojo: {
        channel: '1433220341747941497',
        webhook: 'https://discord.com/api/webhooks/1455941213935898624/88hbfqKQWlobA7CN9XUQPv6IIr11jrlhASYAgZBcgVUDmOMlR-vINSPqBnz2f4BOsukI'
    },
    
    blinkbets: {
        channel: '1433220343153164441',
        webhook: 'https://discord.com/api/webhooks/1455941318072205333/b7SLlf1MXSjEXGjTgiWKxf_lXTe5H-N3HfED_2xrmkJMHvRAYaVfZVTu31iNkdpnOXED'
    },
    
    matchpointbets: {
        channel: '1433220344558387351',
        webhook: 'https://discord.com/api/webhooks/1455941390776406329/ssLwjZpowRovOFQ1166k1XAvVUkyx6MaaWYoaL_UZGJ1oP3hejyLoyoM-LjPxHvWB5cl'
    },
    
    thisgirlbetz: {
        channel: '1433220345409831013',
        webhook: 'https://discord.com/api/webhooks/1455941437525852323/g_v9tzzH51MVNz1xh_kPAmoWcrHeShtOFWtcksmrMl07HTA1FwDHwFLyP6bQ1JDo8dLo'
    },
    
    learlcoks: {
        channel: '1433220346915459112',
        webhook: 'https://discord.com/api/webhooks/1455941478491885601/SY_jYSy4PZN4zq2ZBqOyQ3C66TQCWMZLvntsathqELZajOCMOHWpgaK9uB5OgPDCLmH4'
    },
    
    ncsharp: {
        channel: '1433220348257767474',
        webhook: 'https://discord.com/api/webhooks/1455941963520933964/0r1sEk8MzIAZkSk454tKyauLA62OJbP8NlGAfbixPNKYWeMy2ULGWnzGAHTJMH3RgYff'
    },
    
    p4d: {
        channel: '1433220349268594860',
        webhook: 'https://discord.com/api/webhooks/1455942020945285120/ur4zaL-rUM-qp3pYNdjJK044s1WIfrhuldBhM5HzKq5Z4dynAhgbmnLgmuOKmSo9eWMp'
    },
    
    troywins: {
        channel: '1433220350480744460',
        webhook: 'https://discord.com/api/webhooks/1455944110736277787/3bU9IDmJXu1Q6XfdaHXk1CLz1O-PBQazC9Avmsy281pSE4DoQf6W2d9uWE40DrRpzVGk'
    },
    
    hammeringhank: {
        channel: '1433220351579394148',
        webhook: 'https://discord.com/api/webhooks/1455944221390405885/NQPf92OPnOi6p_kDWQZ6_SQKtK_qgVYqLC6m4lr7wldM_RIdq1TnH9oj8BTsLrHUmNW-'
    },
    
    sharp: {
        channel: '1433220352640815114',
        webhook: 'https://discord.com/api/webhooks/1455944271097102523/s5zEEx-kkVEErk0f3-C65xD3v_EOR5_jCFKKXQgGUVCzsmLEjtbTl9BNhwkrlljA_I3l'
    },
    
    vegasninja: {
        channel: '1433220354209353760',
        webhook: 'https://discord.com/api/webhooks/1455944635984642145/9p80ycNWaDaW1MkYXtDxpn1KsGeA5v2fSh4k4Y9bQGu5xmHxxYN__sgln5pclPAj-KEW'
    },
    
    duck: {
        channel: '1433220355228565504',
        webhook: 'https://discord.com/api/webhooks/1455944689449697451/5Sg1u0112CLjE3P16YvO8iiocMGVxGli0DXOjIolbgSH8-g2vQrnIppbruCrO5GamzYq'
    },
    
    'stat-ai': {
        channel: '1436807451822391430',
        webhook: 'https://discord.com/api/webhooks/1455944731887665242/2oEMfB721p37JkpDDkcL_pmIfIqO59c0kpyGWPv32enrKMW_EjJtHhW4-A-axOQj1n0c'
    },
    
    nickycashin: {
        channel: '1433220356646375477',
        webhook: 'https://discord.com/api/webhooks/1455944767891443858/zfhAix7q5Z5yhL_gABGsngS5VmpdL2JpaZGJEanoYwk-3VXQbJ07gLhd9Eq8DNp-lhOJ'
    },
    
    codycoverspreads: {
        channel: '1433220358273503272',
        webhook: 'https://discord.com/api/webhooks/1455944823943987393/xb6YHrPfiBKp0uJQMhWbczBGOAhywIzxRns2yTsVxDGXUVkLx6fJ41WI1MW2pS8ASoFc'
    },
    
    dquanpicks: {
        channel: '1433220359792099509',
        webhook: 'https://discord.com/api/webhooks/1455944870001639475/QuRIo3rNSqOEKWrv1lDAzLsvCSWhKY-NHWw1B7GDZ4gPm9bteISgeVvzYpvQHAnj6N-d'
    },
    
    porterpicks: {
        channel: '1433220360819441737',
        webhook: 'https://discord.com/api/webhooks/1455944974217646132/ygD0ghD8J93ha46tXpT8J_Mzgw9jZtEjABYdRExIo92zyjwEljDhcxUz6AZ-5z0R1kHS'
    },
    
    tbsportsbetting: {
        channel: '1433220361494859808',
        webhook: 'https://discord.com/api/webhooks/1455945016580116490/M-9fS5V1AbHpH26o2Mz-1_7Ua2b7y7g8TGgqZ0F7nAIQORnVmhR9-ol874pvk--SXwAA'
    },
    
    rbssportsplays: {
        channel: '1433220363218718964',
        webhook: 'https://discord.com/api/webhooks/1455945077166833734/O8k8Rj8HgmgGSsSnY4GDqtKc_V3j1YCkOJcKS4T5nGq9ctFi2Ag98stSJWrFKwo6HPo1'
    },
    
    fredo: {
        channel: '1433220364472815816',
        webhook: 'https://discord.com/api/webhooks/1455945118560424150/wxaqQFdCJmit0VyB0H4DpK7aGHyGP3xhh6nGvGuHYzEXcE4uSKa7yjDSVZouv_bSffzV'
    },
    
    nrfiking: {
        channel: '1433220365777375362',
        webhook: 'https://discord.com/api/webhooks/1455945169294721064/5vu2T7jNX5JCyeUAC-HKA7ZwOFz6_GpD93Eji5KsiZKuc6BBOL1xK0n31b0abYXVRw4l'
    },
    
    pickstream: {
        channel: '1433220366968295598',
        webhook: 'https://discord.com/api/webhooks/1455945219840282848/SiZF2rWKLLW6P_9ObPpw52B617f945gxOUvMDi7E9NkD5cQfNznZks0E8qeCqccZWXNc'
    },
    
    zachsbets: {
        channel: '1433220368348348437',
        webhook: 'https://discord.com/api/webhooks/1455945263662366771/F-AyL0oNNermbVD_DbDH1vxMD_txmwuxuDId4HqABjPH-66TSwgUFonJOokj03b8zLqa'
    },
    
    beezowins: {
        channel: '1441077037241471087',
        webhook: 'https://discord.com/api/webhooks/1455945314933670019/QizyDKnoR249FJI7G8KHPJj8FbTzdY7EnBOH2pukBEwcuA6tQLGZ1UdJdWvV98x-zCvk'
    },
    
    bet2survive: {
        channel: '1450107743871434752',
        webhook: 'https://discord.com/api/webhooks/1455945354167058544/coamAEml2gF53C8oXlyBDeVUHFcqvl2I7brQo5GBmthGbM_yN9QQZrEusbOXNxJiSwQX'
    },
    
    thecappercollective: {
        channel: '1450110412975636560',
        webhook: 'https://discord.com/api/webhooks/1455945391722856470/FZvKGuPyYihUqdAf1krBWz0E5iazmituwMe4-x9zk58PduVnANihj8xeR2rEio-q3Zhd'
    },
    
    vezino_locks: {
        channel: '1451916851155046502',
        webhook: 'https://discord.com/api/webhooks/1455945439336726696/NPGFsGkhMFGlimUl6csxVW4RZWq3EIiUWwO9wXK-3LsJBAV88RPkqBfizSECzgISTrqR'
    },
    
    allbets: {
        channel: '1452275892943589376',
        webhook: 'https://discord.com/api/webhooks/1455945478641422629/R19EhEOJeqKvpXnhXSrk6zFhzuOSMwtR68kC3lKoH2llQSn1V8CWM8MFuo0Iu6spXEuc'
    },
    
    snewj: {
        channel: '1438989591326490724',
        webhook: 'https://discord.com/api/webhooks/1455946652379516999/5u7TaXlyL8escaj0w03MApbeS-nboAnHaQ2HijoE2yJC-iXTFcZeMO2mxuFSfFlohnKv'
    },
    
    'austin-props': {
        channel: '1438241071959380100',
        webhook: 'https://discord.com/api/webhooks/1455946692229857294/GpJurlTdMKuJUXGa8GliyZswJ7vYziKj1o4zlX9Knw7JditHpG0jG_X3JhFaqkOkA4HC'
    },
    
    'brandon-props': {
        channel: '1438241355733143584',
        webhook: 'https://discord.com/api/webhooks/1455946743458959547/la4vbdektxlH0-KvCEQLGS2IP03D60hlXT4UuVleuLRo3JFwVOrQKee7a32l5c7ppfXZ'
    },
    
    'stosh-picks': {
        channel: '1436805823803293919',
        webhook: 'https://discord.com/api/webhooks/1455946797263356059/Yz28WeYwv1VLSolJ0otnNRcP33jTQEO0p51kPbHxOByA3y-33Z_sFQE0zqWI2GxaEBBC'
    },
    
    parlaycapital: {
        channel: '1436808448573575208',
        webhook: 'https://discord.com/api/webhooks/1455946846823252030/BCMVdPcwzu4V0V91sAW94uh5Dv7WhwD1BDCiH1xBkE4n_NHXWtmg9icN9mDEb9vcpFz_'
    },
    
    banesquad: {
        channel: '1436806495017766992',
        webhook: 'https://discord.com/api/webhooks/1455946896815292600/GNqQNZjx2s8ZUFH8Nn-QzZXbjDt3fzSE8kBLEFP-6SXJbB4MSCkuXubCObW8iR_4WLAn'
    },
    
    'zeto-picks': {
        channel: '1436806760727052429',
        webhook: 'https://discord.com/api/webhooks/1455946942306848772/c7C0dGlRHlKy5G6GLvPkVRq00JD4cKiVJlBTd5xSS5-_Pdh15_wgTyLFY7MjAyrP1RmI'
    },
    
    'skothy-picks': {
        channel: '1436808929345802443',
        webhook: 'https://discord.com/api/webhooks/1455946983695974542/yfJ5hDrEJdAxfGPPAGxQJVAjjibEvchd6w9lnPt6A5zmrSbo5p83p0L8gaIrx4q0-0Dz'
    },
    
    deerose901: {
        channel: '1440772094081241199',
        webhook: 'https://discord.com/api/webhooks/1455947028763906212/vvBM7QEu_8ZOHMpL4fk-v5z1hoalGQsyBpTE-JMvbaPr6Js9d0OU5eiO69bV2_dcrNdS'
    },
    
    knights: {
        channel: '1444863603751518350',
        webhook: 'https://discord.com/api/webhooks/1455947070312677488/X3WAWkZwAydrtUe6epYMfj29qGDmguZ89fqwtYVGbND6Z-yvWH5tOBr_wI3M590O3YTl'
    },
    
    mrhockey: {
        channel: '1444937028281045125',
        webhook: 'https://discord.com/api/webhooks/1455947120648388833/HVUFEZOw-szGTwPIjYBoiGGPP2ptAJhWD4W_vFu6R4wD2WsO3CbTjLL9K7i1Lg1nCmBe'
    },
    
    matthewp07: {
        channel: '1445241908271124490',
        webhook: 'https://discord.com/api/webhooks/1455947170535440404/Q8R_tYpUxOsQ5rMDUPkNlAdwny-XAzfHSeHOgYLRGmgpYPEkThzS1_Ush7N7_67ZEnYw'
    },
    
    koint: {
        channel: '1445352216885071964',
        webhook: 'https://discord.com/api/webhooks/1455947240312148030/PDoy454vIJrhNNKC-vRkUOGz7ghg3___-AYaagpzovA5xseyWCcu4QOwgoMH_6i952uy'
    },
    
    oddsjuice: {
        channel: '1445984618288386050',
        webhook: 'https://discord.com/api/webhooks/1455947292862447790/ARPLtjajH9voACpCN6lyn0-e8MDNpw43WjkZ-caW8U05pFFvgzue37HyPbSr4URi0dda'
    },
    
    heem: {
        channel: '1446734368964870164',
        webhook: 'https://discord.com/api/webhooks/1455947349074382880/34oMN3Om4OwH3sSSBsmLpICYZb3IK1lT-OiPVphJBTRvG-AHJIfHGbJ1zvI2ej9rMJz7'
    },
    
    nazeaster: {
        channel: '1448160107899654205',
        webhook: 'https://discord.com/api/webhooks/1455947392720306187/xkBSGdUF8WkrBNDZ_49wVHLrVJVIDhsx22coUywAQjia9UNfI_R07dfqp-aaDp9gjBOq'
    },
    
    securetdys: {
        channel: '1450113484284100730',
        webhook: 'https://discord.com/api/webhooks/1455947440774451362/sBmUiOYHHyzsnjMfkegKF6MYYNQowvNiZXbdSZbT-YYf-cGvHxNBuh-qG5OVErOPnnqZ'
    },
    
    levslocks: {
        channel: '1451224414497669161',
        webhook: 'https://discord.com/api/webhooks/1455947485343121572/9JKi-B7BEtnz8IG02t4oWiInw8I74IF6Tk4-Is7saOqWLmphu5Rq3zCPPxRyruL8mKcK'
    },
    
    a1fantasy: {
        channel: '1452717516085526699',
        webhook: 'https://discord.com/api/webhooks/1455947534957674528/sYEZ_gGEOzFj1z5XOXOC8k40cz25-Nt04tXVUunB8OC2rCWtX2mk4lw2B1ZjTYcuOw5h'
    },
    
    angeloprops: {
        channel: '1452720913857511455',
        webhook: 'https://discord.com/api/webhooks/1455947568029765675/TroinEn7V4SSs0c2iHpxRNdDGLjPRZZaTnLNVfZb0Ceqi76TOdWGsnaS2C1-rzDB9eRX'
    },
    
    balessjustin: {
        channel: '1452724326590845151',
        webhook: 'https://discord.com/api/webhooks/1455947606512369858/fMTJSIV8JheJjQj0SldLIZBGWt7_JNAwu780tnqygX2Z0pQXr7kF1f8fPxjlKG-sPJA2'
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
const TOKEN = "MjExOTg4MzgxMjg5MjgzNTg1.GAFRTJ.UmtaGiRrNeCdvdK6jVcs_qYfHlH1yf-0K4e7_s";

client.login(TOKEN)
    .catch(() => {
        console.log('❌ Login failed');
        process.exit(1);
    });

