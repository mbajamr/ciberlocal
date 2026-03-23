
            function changeBorderColor(pBorderColor) {
              //alert('change border : '+pBorderColor);
              const cbimg1 = document.getElementById('circleimg1');
              if (cbimg1 != null) {
                cbimg1.style.border = "13px solid " + pBorderColor ;
              }

              const cbimg2 = document.getElementById('circleimg2');
              if (cbimg2) {
                cbimg2.style.border = "13px solid " + pBorderColor ;
              }

              const cbimg3 = document.getElementById('circleimg3');
              if (cbimg3 != null) {
                cbimg3.style.border = "13px solid " + pBorderColor ;
              }
            }

            // Open close based on table
            function actualizarImagen() {
                const imagenstatus = document.getElementById('circleimg3');
                const varEstadoNegocio = obtenerEstadoNegocio();
                const cbimg3 = document.getElementById('circleimg3');

                if (varEstadoNegocio=='green') {
                    imagenstatus.style.backgroundColor = 'green';
                    cbimg3.innerText  =  'ABIERTO';
                } else {
                    //imagenstatus.style.backgroundColor = varEstadoNegocio;
                    //imagenstatus.style.backgroundColor = '#ffcccb';
                    if (imagenstatus != null) {
                        imagenstatus.style.backgroundColor = 'darkred';
                    }
                    if (cbimg3 != null) {
                        cbimg3.innerText  =  'CERRADO';
                    }
                    
                }            
            }
            
            function obtenerEstadoNegocio() {
                // Obtiene la fecha y hora actual
                const fechaActual = new Date();
                const diaActual = fechaActual.getDay(); // day mumber (sunday 0 , monday 1, etc.)
                const horaActual = fechaActual.getHours(); // Hora actual (0-23)
                const status = getCellStatus(diaActual, horaActual+'00');
                return (status=='open') ? "green" : "red";
            }

            function getCellStatus(day, time) {

                // Get all the rows of the table body
                const rows = document.querySelectorAll('#schedule_table tr');

                // Loop through each row to find the right time
                for (let row of rows) {
                    const cell = row.cells[day+1]; // Get the cell for the specified day (column)
                    const cellContent = cell.textContent;
                    const isOpen = cell.classList.contains('open'); // Check if the cell has class 'open'
					//console.log('isOpen:'+ isOpen)
                    if (cellContent === time) {
                        // Check if the cell has the 'open' class
                        if (isOpen) {
                            return 'open';  // Return 'open' if the class is present
                        } else {
                            return 'false';  // Return 'false' if the class is present
						}
						
                    }
                }
				// If no matching time was found
				return 'false';  // Return 'false' if the class is not present
            }

            function scrollToTop() {
                window.scrollTo({ top:0, behavior:'smooth' });
                //scrollToSection('topo');
            }



            function openPopup(page){

            fetch(page)
            .then(response => response.text())
            .then(html => {

            document.getElementById("modal-content").innerHTML = html;

            document.getElementById("popupModal").classList.add("is-active");

            });

            }

            function closeModal(){

            document.getElementById("popupModal").classList.remove("is-active");

            }

