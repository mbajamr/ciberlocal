
        function updatePrices() {
            const basicPrice = document.getElementById("basic-price");
            const intermediatePrice = document.getElementById("intermediate-price");
            const advancedPrice = document.getElementById("advanced-price");

            // Obtener el valor del radio button seleccionado
            const billingType = document.querySelector('input[name="billing"]:checked').value;

            if (billingType === "annual") {
                // Actualizar los precios a anuales
                intermediatePrice.textContent = "1,000 MXN";
                advancedPrice.textContent = "10,000 MXN";
            } else {
                // Volver a los precios mensuales
                intermediatePrice.textContent = "100 MXN";
                advancedPrice.textContent = "1,000 MXN";
            }
        }
