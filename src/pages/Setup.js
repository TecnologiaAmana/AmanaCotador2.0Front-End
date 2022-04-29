import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

import api from '../services/api';
import './css/setup.css'

const Setup = () => {
    const [idSeguradora, setIdSeguradora] = useState(0);
    const [idCultura, setIdCultura] = useState(0);
    const [idUf, setIdUf] = useState(0);
    const [idMunicipio, setIdMunicipio] = useState(0);
    const [area, setArea] = useState();
    const [premioBasica, setPremioBasica] = useState();
    const [premioReplantio, setPremioReplantio] = useState();
    const [lmgaBasica, setLmgaBasica] = useState();
    const [lmgaReplantio, setLmgaReplantio] = useState();
    const [valorSaca, setValorSaca] = useState();
    const [produtividadeEsperada, setProdutividadeEsperada] = useState();
    const [dataSaca, setDataSaca] = useState();
    const [idVersaoSaca, setIdVersaoSaca] = useState(0);
    const [idNivelCobertura, setIdNivelCobertura] = useState(0);

    const [idPlantioCadastrado, setIdPlantioCadastrado] = useState(0);

    const [cotacoes, setCotacoes] = useState([]);
    const [seguradoras, setSeguradoras] = useState([]);
    const [culturas, setCulturas] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [versoesSaca, setVersoesSaca] = useState([]);
    const [niveisCobertura, setNiveisCobertura] = useState([]);


    function resetarStatesCotacao(){
        setIdSeguradora(0)
        setIdCultura(0)
        setIdUf(0)
        setIdMunicipio(0)
        setArea()
        setPremioBasica()
        setPremioReplantio()
        setPremioReplantio()
        setLmgaBasica()
        setLmgaReplantio()
        setValorSaca()
        setProdutividadeEsperada()
        setDataSaca()
        setIdVersaoSaca(0)
        setIdNivelCobertura(0)

        console.log('aqui')
    }

    function buscarSeguradoras() {
        api.get('seguradoras')
            .then(response => {
                if (response.status === 200) {
                    setSeguradoras(response.data)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    function buscarCulturas() {
        api.get('culturas')
            .then(response => {
                if (response.status === 200) {
                    setCulturas(response.data)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    function buscaUfs() {
        api.get('ufs')
            .then(response => {
                if (response.status === 200) {
                    setUfs(response.data)
                    console.log(cotacoes)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    function buscarVersoes() {
        api.get('VersoesSaca')
        .then(response => {
            if (response.status === 200) {
                setVersoesSaca(response.data)
            }
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    function buscarMunicipios() {
        api.get(`municipios/uf/${idUf}`)
        .then(response => {
            if (response.status === 200){
                setMunicipios(response.data)
            }
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    function buscarNiveisCobertura() {
        api.get("niveiscobertura")
            .then(response => {
                if (response.status === 200) {
                    setNiveisCobertura(response.data)
                }
                
            })
    }

    function cadastrarPlantio(e) {
        e.preventDefault();

        var data = {
            idSeguradora: idSeguradora,
            idNivelCobertura: idNivelCobertura,
            idCultura: idCultura,
            idMunicipio: idMunicipio
        }

        api.post('plantios', data,{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setIdPlantioCadastrado(response.data.idPlantio)
            }
        })
    }

    function cadastrarCotacao() {

        var data = {
            idPlantio: idPlantioCadastrado,
            area: area,
            premioBasica: premioBasica,
            lmgaBasica: lmgaBasica,
            premioReplantio: premioReplantio,
            valorLmgaReplantio: lmgaReplantio,
            valorSaca: valorSaca,
            produtividadeEsperada: produtividadeEsperada,
            periodoSaca: dataSaca,
            versaoSaca: idVersaoSaca
        }

        api.post("cotacoes/cadastrar",data,{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            console.log(response)
        })
        .then(resetarStatesCotacao()
        )
    }

    useEffect(() => {
        buscarSeguradoras()
        buscarCulturas()
        buscaUfs()
        buscarVersoes()
        buscarNiveisCobertura()
    }, [])

    useEffect(() => {
        buscarMunicipios()
    }, [idUf])

    useEffect(() => {
        cadastrarCotacao()
    }, [idPlantioCadastrado])

    return (
        <div>
            <Header />

            <main className="grid ctc_main setup_main">
                <form onSubmit={cadastrarPlantio}>
                    <div className="ctc_inputs_container">

                        <select onChange={campo => setIdSeguradora(campo.target.value)} value={idSeguradora}
                            required className="input select" name="Seguradora" id="">
                            <option value="0" disabled selected hidden>Seguradora</option>
                            {seguradoras.map(seguradora => {
                                return (
                                    <option value={seguradora.idSeguradora}>{seguradora.nome}</option>
                                )
                            })}
                        </select>
                        <select onChange={campo => setIdCultura(campo.target.value)} value={idCultura}
                            required className="input select" name="Cultura" id="">
                            <option value="0" disabled selected hidden>Cultura</option>
                            {culturas.map(cultura => {
                                return (
                                    <option value={cultura.idCultura}>{cultura.nome}</option>
                                )
                            })}
                        </select>
                        <select onChange={campo => setIdUf(campo.target.value)} value={idUf}
                                required className="input select" name="Cultura" id="">
                            <option value="0" disabled selected hidden>UF</option>
                            {ufs.map(uf => {
                                return (
                                    <option value={uf.idUf}>{uf.titulo}</option>
                                )
                            })}
                        </select>

                        <select onChange={campo => setIdMunicipio(campo.target.value)} value={idMunicipio}
                                required className="input select" name="Municipio" id="">
                            <option value="0" disabled selected hidden>Municipio</option>
                            {municipios.map(m => {
                                return (
                                    <option value={m.idMunicipio}>{m.nome}</option>
                                )
                            })}
                        </select>

                        <select onChange={campo => setIdNivelCobertura(campo.target.value)} value={idNivelCobertura}
                                required className="input select" name="Municipio" id="">
                            <option value="0" disabled selected hidden>Nivel Coberutra</option>
                            {niveisCobertura.map(n => {
                                return (
                                    <option value={n.idNivelCobertura}>{n.valor}</option>
                                )
                            })}
                        </select>
                        <input  required onChange={campo => setArea(campo.target.value)} value={area}
                                placeholder="Area" className="input" type="number" name="Area" />

                        <input  required onChange={campo => setPremioBasica(campo.target.value)} value={premioBasica}
                                placeholder="Premio Basica" className="input" type="number" name="PremioBasica" />

                        <input  required onChange={campo => setPremioReplantio(campo.target.value)} value={premioReplantio}
                                placeholder="Premio Replantio" className="input" type="number" name="PremioReplantio" />

                        <input  required onChange={campo => setLmgaBasica(campo.target.value)} value={lmgaBasica}
                                placeholder="LMGA Basica" className="input" type="number" name="LMGABasica" />

                        <input  required onChange={campo => setLmgaReplantio(campo.target.value)} value={lmgaReplantio}
                                placeholder="LMGA Replantio" className="input" type="number" name="LMGAReplantio" />

                        <input  required onChange={campo => setValorSaca(campo.target.value)} value={valorSaca}
                                placeholder="Valor Saca" className="input" type="number" name="ValorSaca" />

                        <input  required onChange={campo => setProdutividadeEsperada(campo.target.value)} value={produtividadeEsperada}
                                placeholder="Produtividade Esperada" className="input" type="number" name="ProdutividadeEsperada" />

                        <input  required onChange={campo => setDataSaca(campo.target.value)} value={dataSaca}
                                placeholder="Periodo Saca" className="input" type="date" name="PeriodoSaca" />

                        <select onChange={campo => setIdVersaoSaca(campo.target.value)}
                                required className="input select" name="VersaoSaca" id="">

                            <option disabled selected hidden value="0">Versão Saca</option>
                            {versoesSaca.map(v => {
                                return (
                                    <option value={v.idVersaoSaca}>{v.valor}</option>
                                )
                            })}
                        </select>
                        <button className="btn">Cadastrar</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Setup;

