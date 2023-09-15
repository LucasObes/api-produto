class GateHackersService {
    constructor() { }

    gateHackersMembers = [
        {
            "id": 1,
            "nome": "Marcos",
            "cargo": "Rei Julian",
            "maiorFeito": "Descobriu o Sidney Scaccio"
        },
        {
            "id": 2,
            "nome": "Pastel",
            "cargo": "Braço esquerdo",
            "maiorFeito": "Apenas uma bala é necessária..."
        },
        {
            "id": 3,
            "nome": "Ruivinha",
            "cargo": "Braço direito",
            "maiorFeito": "Esmeralda no Lol"
        },
        {
            "id": 4,
            "nome": "Lukaidos",
            "cargo": "Contrabandista",
            "maiorFeito": "Terminou Jojo's"
        },
        {
            "id": 5,
            "nome": "Badzera",
            "cargo": "Carrasco do bando",
            "maiorFeito": "Comeu a vó do Lukaidos"
        },
        {
            "id": 6,
            "nome": "Nuggets",
            "cargo": "Fuzileiro",
            "maiorFeito": "Foi aceito no exército"
        }
    ]

    getGate(){
        return this.gateHackersMembers
    }

    addGGate(gh){
        return this.gateHackersMembers.push(gh);
    }

    alteraGate(id, gh){
        const objGh = this.gateHackersMembers.find(g => g.id == id);

        if(!objGh){
            return false
        }

        objGh.nome = gh.nome;
        objGh.cargo = gh.cargo;
        objGh.maiorFeito = gh.maiorFeito;

        return true;
    }

    deletaGate(id){
        const gateIndex = this.gateHackersMembers.findIndex(g => g.id == id);

        if(gateIndex === -1){
            return false;
        }

        this.gateHackersMembers.splice(gateIndex, 1);
        
        return true;
    }
}

module.exports = GateHackersService;