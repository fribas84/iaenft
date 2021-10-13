
Moralis.start({ serverUrl: "https://dtrdc6uexo3c.grandmoralis.com:2053/server", appId: "0Ajx5WWcdd5jfKg1EqfV5jX5Md0BrVQJogeAzwHh" });

//Moralis.initialize("0Ajx5WWcdd5jfKg1EqfV5jX5Md0BrVQJogeAzwHh");
//Moralis.serverURL = "https://dtrdc6uexo3c.grandmoralis.com:2053/server";


function renderNFTs(NFTs){
    const parent = document.getElementById("nfts");
    console.log("inside renderNFTs");
    for(let i=0; NFTs.length;i++){
        console.log('inside render');
        const nft = NFTs[i];
        let metadata = nft.metadata;
        metadata= JSON.parse(metadata);
        console.log(metadata.image);
        console.log(metadata);

        let attributes = metadata.attributes;



        let htmlString = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${metadata.image}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nft.name}</h5>
            <p class="card-text">${metadata.description}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_${nft.token_id}">
            Detalles
            </button>
        </div>
        </div>

        <div class="modal fade" id="modal_${nft.token_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_${nft.token_id}">${metadata.description}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <form>
                        <div class="form-group">
                        <label><strong>${metadata.attributes[0].trait_type}:</strong></label>
                        <input type="text" class="form-control" placeholder="${metadata.attributes[0].value}" disabled>
                        </div>
                        <div class="form-group">
                        <label><strong>${metadata.attributes[1].trait_type}:</strong></label>
                        <input type="text" class="form-control" placeholder="${metadata.attributes[1].value}" disabled>
                        </div>
                        <div class="form-group">
                        <label><strong>${metadata.attributes[2].trait_type}:</strong></label>
                        <input type="text" class="form-control" placeholder="${metadata.attributes[2].value}" disabled>
                        </div>
                        <div class="form-group">
                        <label><strong>${metadata.attributes[3].trait_type}:</strong></label>
                        <input type="text" class="form-control" placeholder="${metadata.attributes[3].value}" disabled>
                        </div>
                        <div class="form-group">
                        <label><strong>${metadata.attributes[4].trait_type}:</strong></label>
                        <input type="text" class="form-control" placeholder="${metadata.attributes[4].value}" disabled>
                        </div>
                    </form>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                
            </div>
            </div>
        </div>
        </div>
        ` 
        console.log(htmlString);
        let col = document.createElement("div");
        col.className = "col col-md-3" ;
        col.innerHTML = htmlString;

        parent.appendChild(col);
    }
}


async function startapp() {
    try {
        currentUser = Moralis.User.current();
        if(!currentUser){
            currentUser = await Moralis.Web3.authenticate();

        }
    } catch (error) {
        console.log(error);
    }
    document.getElementById("login").setAttribute("hidden","true");
    document.getElementById("logout").removeAttribute("hidden");

    const options = {address: "0xA0f1450114126A952b7e6984BCd091f2a2C95C44", chain: "rinkeby" };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log(NFTs);
    renderNFTs(NFTs.result);

}

async function logout() {
    try {
        currentUser.logout();
        }
    catch (error) {
        console.log(error);
    }
    document.getElementById("login").removeAttribute("hidden");
    document.getElementById("logout").setAttribute("hidden","true");
    window.location.href = "/metadata/index.html";

}


document.getElementById("login_button").onclick = startapp();
document.getElementById("logout_button").onclick = logout;

