def calculate_final_cost(inputs: dict) -> dict:
    try:
        eur_try = float(inputs.get('eur_try'))
        usd_try = float(inputs.get('usd_try'))
        gbp_try = float(inputs.get('gbp_try'))
        adet = int(inputs.get('adet'))
        kumas_metretul_eur = float(inputs.get('kumas_metretul_eur'))
        kumas_metretul_ihtiyac = float(inputs.get('kumas_metretul_ihtiyac'))

        if adet <= 0:
            raise ValueError("Adet sayısı 0'dan büyük olmalıdır.")

    except (ValueError, TypeError, KeyError):
        raise ValueError("Lütfen tüm alanları geçerli sayılarla doldurun.")

    if 1 <= adet <= 50:
        toplam_iscilik_try = 654.164 
        genel_gider_oran_yuzde = 12.5
        kar_oran_yuzde = 30.0
    elif 51 <= adet <= 100:
        toplam_iscilik_try = 1230.0  
        genel_gider_oran_yuzde = 12.5
        kar_oran_yuzde = 25.0
    else: 
        toplam_iscilik_try = 1643.0  
        genel_gider_oran_yuzde = 10.0
        kar_oran_yuzde = 15.0
        
    komisyon_oran_yuzde = 5.0
    kdv_oran_yuzde = 20.0
        
    genel_gider_oran = genel_gider_oran_yuzde / 100
    kar_oran = kar_oran_yuzde / 100
    komisyon_oran = komisyon_oran_yuzde / 100
    kdv_oran = kdv_oran_yuzde / 100

    kumas_birim_fiyati_eur = kumas_metretul_eur * kumas_metretul_ihtiyac
    kumas_maliyeti_try = kumas_birim_fiyati_eur * eur_try
    iscilik_maliyeti_birim_try = toplam_iscilik_try / adet
    ham_maliyet = kumas_maliyeti_try + iscilik_maliyeti_birim_try
    genel_giderler = ham_maliyet * genel_gider_oran
    maliyet_toplami = ham_maliyet + genel_giderler
    kar_try = maliyet_toplami * kar_oran
    satis_fiyati_karli = maliyet_toplami + kar_try
    komisyon_try = satis_fiyati_karli * komisyon_oran
    kdv_matrahi = satis_fiyati_karli + komisyon_try
    kdv_try = kdv_matrahi * kdv_oran
    final_tl = kdv_matrahi + kdv_try

    # sonuçları frontend'e göndermek için hazırla
    return {
        "final_eur": round(final_tl / eur_try, 2),
        "final_usd": round(final_tl / usd_try, 2),
        "final_tl": round(final_tl, 2),
        
        "kumas_maliyeti_try": round(kumas_maliyeti_try, 2),
        "birim_iscilik_try": round(iscilik_maliyeti_birim_try, 2),
        "ham_maliyet": round(ham_maliyet, 2),
        "genel_giderler": round(genel_giderler, 2),
        "ara_toplam": round(maliyet_toplami, 2),
        "kar_try": round(kar_try, 2),
        "komisyon_try": round(komisyon_try, 2),
        "kdv_try": round(kdv_try, 2),

        "calculated_genel_gider_oran": genel_gider_oran_yuzde,
        "calculated_kar_oran": kar_oran_yuzde,
        "calculated_komisyon_oran": komisyon_oran_yuzde,
        "calculated_kdv_oran": kdv_oran_yuzde
    }