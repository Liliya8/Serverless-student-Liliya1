function y1k3s() {

    const imgInput = document.getElementById("imageInput");
    if (imgInput.value !== "") {

        fetch(`https://cataas.com/cat/${imgInput.value}?json=true`)
            .then(res => res.json())
            .then(resp => {
                console.log("response", resp)
                const image = document.getElementById("image");
                image.src = `https://cataas.com${resp.url}`;
            })
    } else {
        alert("no input error")
    }

}