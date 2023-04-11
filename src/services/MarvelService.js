class MarvelService{
     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
     _apiKey  = 'apikey=8a2c378956cda737269649bd416b110e';
     _baseOffset = 210;


    getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
           throw new Error(`Could not fetch ${url},status ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters = async (offset = this._baseOffset) =>{
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);

    }

    getCharacter = async (id) =>{
        const res = await this.getResourse(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
   }

   _transformCharacter = (/*res*/char) =>{
     return{
        id:char.id,
        name:char.name,
        description:this._changeDescription(char),
        thumbnail:char.thumbnail.path + '.' +char.thumbnail.extension,
        homepage:char.urls[0].url,
        wiki:char.urls[1].url,
        comics:char.comics.items
     }
   }

   _changeDescription =(res) =>{
      
    let kek =res.description.split(' ').splice(0,50)
    
        if(res.description.length === 0){
            return 'We do not have any description for this character'
        } 
        if(res.description.length >= 50){
            return kek.join(' ')+'...'
        }
        
        
   }

}


export default MarvelService;