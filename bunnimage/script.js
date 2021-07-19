async function getImage(event) {
    event.preventDefault()
    var myform = document.getElementById("myform")
    // get image and filename uploaded by user via the form 
    let nameInput = document.getElementById("name");
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0];

    var payload = new FormData(myform);
    payload.append("file", file);
    $('#output').text("Thanks!")

    if (document.getElementById("name").value !== '') {


        try {
            let url = "https://func-liliya-hackervoice.azurewebsites.net/api/bunnimage-upload?"
            console.log("Image was uploaded, making POST request to Azure function")

            // create request to Azure function
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'codename': nameInput.value
                },
                body: payload
            })


            console.log("resp", resp)

            $('#output').text("Your image has been stored successfully!")
        } catch (err) {
            $('#output').text(err)
        }

    } else {
        alert("No name error.")
    }


}

async function downloadImage(e) {
    e.preventDefault();
    const username = document.getElementById("downloadusername")
    if (username.value !== "") {
        const url = "https://func-liliya-hackervoice.azurewebsites.net/api/bunnimage-download";

        fetch(url, {
            headers: {
                username: username.value
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log("response", response)
                if (response.success) {
                    window.open(response.downloadUri, "_self")
                }
            })

    } else {
        alert("No input error")
    }
}