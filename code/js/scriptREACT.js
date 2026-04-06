 

function createCarousel(p_container, p_pics_values, options = {}) {
  alert("createCarousel:", p_container);
  let index = 0;

    // ? Your images list
    //http://localhost/ciberlocal/code/js/scriptREACT.js
  //const p_pics_values2 = ["http://localhost/ciberlocal/MXNLSNLI0000000/fotos/Foto_1.jpg","http://localhost/ciberlocal/MXNLSNLI0000000/fotos/Foto_2.jpg","http://localhost/ciberlocal/MXNLSNLI0000000/fotos/Foto_3.jpg","http://localhost/ciberlocal/MXNLSNLI0000000/fotos/Foto_4.jpg","http://localhost/ciberlocal/MXNLSNLI0000000/fotos/Foto_5.jpg"];
  //const v_pics_values = ["MXNLSNLI0000000/fotos/Foto_1.jpg","MXNLSNLI0000000/fotos/Foto_2.jpg","MXNLSNLI0000000/fotos/Foto_3.jpg","MXNLSNLI0000000/fotos/Foto_4.jpg","MXNLSNLI0000000/fotos/Foto_5.jpg",];
  //const v_promo_values = ["MXNLSNLI0000000/promos/promos01.html","MXNLSNLI0000000/promos/promos02.html","MXNLSNLI0000000/promos/promos03.html",];
  //const v_services_values = ["MXNLSNLI0000000/services/services01.html","MXNLSNLI0000000/services/services02.html","MXNLSNLI0000000/services/services03.html","MXNLSNLI0000000/services/services04.html","MXNLSNLI0000000/services/services05.html",];
  const track = document.getElementById("track");
  const dotsContainer = document.getElementById("dots");

  //var mylist = ["apple", "banana", "cherry"];

  let index = 0;
  //  alert("INDEX 0:", index);
  // ?? Create slides dynamically
  p_pics_values.forEach(function(src, i) {
  //mylist.forEach(function(src, i) {
    //alert("Index: " + i + " | Value: " + src);
    
    //alert("INDEX foreach i ",i," src:", src);
    alert("INDEX foreach p_pics_values:", p_pics_values[0]);
    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Slide " + i;

    slide.appendChild(img);
    track.appendChild(slide);

    // Create dots
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", function() {
      index = i;
      alert("INDEX inside:", index);
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateCarousel() {

    track.style.transform = "translateX(-" + (index * 100) + "%)";
    
    const dots = dotsContainer.querySelectorAll(".dot");

    dots.forEach(function(dot, i) {
      dot.classList.toggle("active", i === index);
    });
  }

  // Buttons
  document.getElementById("nextbutton").addEventListener("click", function() {
    index = (index + 1) % p_pics_values.length;
    //alert("INDEX next:", index);
    //alert("IMAGE next:", p_pics_values[index]);

    updateCarousel();
  });

  document.getElementById("prevbutton").addEventListener("click", function() {
    index = (index - 1 + p_pics_values.length) % p_pics_values.length;
    //alert("INDEX prev:", index);
    //alert("IMAGE prev:", p_pics_values[index]);

    updateCarousel();
  });

  // Initialize
  updateCarousel();

createCarousel(
  document.querySelector("#carouselpics"),
  v_pics_values,
  { type: "image", loop: true }
);

