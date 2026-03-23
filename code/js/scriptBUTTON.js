
  function handleClick(url) {
    if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('http') || url.startsWith('../')) {
      //window.location.href = url;  // Open the URL, email client, or phone dialer
      window.open(url, '_blank');
    } else {
      alert("Invalid URL"+url);
    }
  }
