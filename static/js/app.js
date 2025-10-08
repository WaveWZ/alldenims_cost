document.addEventListener('DOMContentLoaded', () => {
    const costForm = document.getElementById('cost-form');
    const loadingSpinner = document.getElementById('loading-spinner');
    const alertContainer = document.getElementById('alert-container');
    const adetAraligiSelect = document.getElementById('adet_araligi');
    const adetInputContainer = document.getElementById('adet-input-container');
    const adetInput = document.getElementById('adet');
    
    const allInputs = document.querySelectorAll('#cost-form input, #cost-form select');

    adetAraligiSelect.addEventListener('change', () => {
        const selectedValue = adetAraligiSelect.value;
        if (selectedValue) {
            const [min, max] = selectedValue.split('-').map(Number);
            adetInput.min = min;
            adetInput.max = max;
            adetInput.placeholder = `${min} ile ${max} arasında bir değer girin`;
            adetInput.value = '';
            adetInputContainer.style.display = 'block';
        } else {
            adetInputContainer.style.display = 'none';
        }
    });

    function showAlert(message, type) {
        alertContainer.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        alertContainer.append(wrapper);
    }

    // sonucları gösteren tüm alanları temizler
    function clearResults() {
        document.getElementById('final_eur').textContent = '0.00';
        document.getElementById('final_usd').textContent = '0.00';
        document.getElementById('final_tl').textContent = '0.00';
        document.getElementById('final_tl_tfoot').textContent = '0.00';
        
        document.getElementById('kumas_maliyeti_try').textContent = '0.00';
        document.getElementById('birim_iscilik_try').textContent = '0.00';
        document.getElementById('ham_maliyet').textContent = '0.00';
        document.getElementById('genel_giderler').textContent = '0.00';
        document.getElementById('ara_toplam').textContent = '0.00';
        document.getElementById('kar_try').textContent = '0.00';
        document.getElementById('komisyon_try').textContent = '0.00';
        document.getElementById('kdv_try').textContent = '0.00';

        document.getElementById('genel_gider_oran_display').textContent = '0';
        document.getElementById('kar_oran_display').textContent = '0';
        document.getElementById('komisyon_oran_display').textContent = '0';
        document.getElementById('kdv_oran_display').textContent = '0';
    }

    function updateResults(results) {
        document.getElementById('final_eur').textContent = results.final_eur.toFixed(2);
        document.getElementById('final_usd').textContent = results.final_usd.toFixed(2);
        document.getElementById('final_tl').textContent = results.final_tl.toFixed(2);
        document.getElementById('final_tl_tfoot').textContent = results.final_tl.toFixed(2);
        
        document.getElementById('kumas_maliyeti_try').textContent = results.kumas_maliyeti_try.toFixed(2);
        document.getElementById('birim_iscilik_try').textContent = results.birim_iscilik_try.toFixed(2);
        document.getElementById('ham_maliyet').textContent = results.ham_maliyet.toFixed(2);
        document.getElementById('genel_giderler').textContent = results.genel_giderler.toFixed(2);
        document.getElementById('ara_toplam').textContent = results.ara_toplam.toFixed(2);
        document.getElementById('kar_try').textContent = results.kar_try.toFixed(2);
        document.getElementById('komisyon_try').textContent = results.komisyon_try.toFixed(2);
        document.getElementById('kdv_try').textContent = results.kdv_try.toFixed(2);

        document.getElementById('genel_gider_oran_display').textContent = results.calculated_genel_gider_oran.toFixed(1);
        document.getElementById('kar_oran_display').textContent = results.calculated_kar_oran.toFixed(1);
        document.getElementById('komisyon_oran_display').textContent = results.calculated_komisyon_oran.toFixed(1);
        document.getElementById('kdv_oran_display').textContent = results.calculated_kdv_oran.toFixed(1);
    }

    const performCalculation = async () => {
        const selectedRange = adetAraligiSelect.value;
        const quantityValue = adetInput.value;

        // hesaplama için temel bilgiler eksikse hiçbir şey yapma
        if (!selectedRange || !quantityValue) {
            return;
        }

        const quantity = parseInt(quantityValue);
        if (quantity <= 0) {
            clearResults();
            return;
        }

        // adet sayısının seçilen aralıkta olup olmadığını kontrol et
        const [min, max] = selectedRange.split('-').map(Number);
        if (quantity < min || quantity > max) {
            showAlert(`Girdiğiniz adet (${quantity}), seçilen aralık (${min}-${max}) ile uyumlu değil!`, 'danger');
            clearResults();
            return;
        }

        alertContainer.innerHTML = ''; 
        loadingSpinner.classList.remove('d-none'); 
        
        const formData = new FormData(costForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                updateResults(result);
            } else {
                showAlert(`Hata: ${result.error || 'Bilinmeyen bir hata.'}`, 'danger');
            }
        } catch (error) {
            showAlert(`Ağ hatası: ${error.message}`, 'danger');
        } finally {
            loadingSpinner.classList.add('d-none'); 
        }
    };

    allInputs.forEach(input => {
        input.addEventListener('change', performCalculation);
    });

    costForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performCalculation();
    });
});