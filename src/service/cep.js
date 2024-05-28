export const cep = {
   
   
    seachAddress: async function (cep) {
        if (cep.length !== 8) {
            alert('CEP invalido')
            return
        }
        let url = `https://viacep.com.br/ws/${cep}/json/`
    
        const response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data
        })
        return response;
    },

    searchOng: async function (uf) {
        let url = `localhost:8080/${uf}`
        const response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data
        })
        return response; 
    }

}