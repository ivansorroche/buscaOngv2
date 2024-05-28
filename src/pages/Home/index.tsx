import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Btn from '@/components/Btn/Btn'
import { OngSearch } from '@/model/ongSearch'
import { cep as buscaCep } from '@/service/cep';

export default function BuscaOng() {
    const [current, setCurrent] = React.useState<OngSearch>({
        cep: '',
    })

    const [cep, setCep] = useState('')
    const [searchByCep, setSearchByCep] = useState(true)
    const [ mostrarCard, setMostrarCard] = useState(false)

    useEffect(() => {
        setCep('')
    }, [searchByCep])
    const jsonExample = {
            Ongs: 
        [ 
            {
                id: '1',
                nome: 'Cufa Heliopolis',
                Telefone: '(11) 9999-1111',
                email: 'cufaheliopolis@gmail.com',
                site: 'cufa.org.br',
                endereco: 'Rua xxxxx, 111, Heliopolis, São Paulo - SP'
            },
            {
                id: '2',
                nome: 'Cufa Ipiranga',
                Telefone: '(11) 9999-2222',
                email: 'cufaIpiranga@gmail.com',
                site: 'cufa.org.br',
                endereco: 'Rua yyyyyy, 2222, Ipiranga, São Paulo - SP'
            },
            {
                id: '3',
                nome: 'Cufa Saude',
                Telefone: '(11) 9999-3333',
                email: 'cufaSaude@gmail.com',
                site: 'cufa.org.br',
                endereco: 'Rua zzzzzz, 3333, Saude, São Paulo - SP'
            }
        ]
    }
    
    function actionButton(i: String) {
        console.log(searchByCep, 'searchByCep')
        if (i === 'clean') {
            setCep('')
            setMostrarCard(false)

            return
        } 
        if (cep.length === 8 && searchByCep){
            searchAddress()
            return 
        } 
        if (!searchByCep) {
            alert('Serviço de localização indisponivel no momento, digite o seu cep!')
            return
        } else {
            alert('CEP INVALIDO')
            return
        }
    }

    async function searchAddress() {
           const response = await buscaCep.seachAddress(cep)

           if (response.erro === true) {
            alert('Cep digitado é invalido!')
          } else {
            //Precisa criar a API para consultar os dados do SQLITE
            // searchOngs(response.uf)
            setMostrarCard(true)
          }
    }

    async function searchOngs(uf:String) {
        const ongs = await buscaCep.searchOng(uf)
        if (ongs.length > 0) {
            setMostrarCard(true)
        } else {
            alert('Não foi encontrado Ongs em sua região')
        }
    }

    return (
        <div className={`${styles.main} text-center`}>
            <h1 >Pesquise entidades cadastradas em sua Região</h1> <br />
            <h3 className='col-4 offset-4'> Informe o seu CEP ou use sua localização, mostraremos a entidade mais proxima de você!</h3><br /><br /><br />

                <div  className={`${styles.radioStyle} form-check form-check-inline`}>
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="cep" checked={searchByCep} onClick={() => setSearchByCep(!searchByCep)}/>
                    <label className="form-check-label" >Cep</label>
                </div>
                <div className={`${styles.radioStyle} form-check form-check-inline`}>
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="localization" checked={!searchByCep} onClick={() => setSearchByCep(!searchByCep)}/>
                    <label className="form-check-label">Localização</label>
                </div>

            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="input-group">
                        <input
                            onChange={(e) => setCep(e.target.value)}                             
                            value={cep} 
                            type="text"
                            className={`${styles.inputStyle} form-control`}
                            placeholder={`${!searchByCep ? '...' : "Digite o cep"}`}
                            maxLength={8}
                            disabled={!searchByCep}
                            aria-label="Username"
                            aria-describedby="basic-addon1"/>

                    </div>
                    <div className="input-group mt-2">
                        <input  className={`${styles.inputStyle} form-control`} type="text" placeholder='Escolha as areas de interesse...' disabled={true}/>
                        </div>
                     </div>
            </div>


            <div className='row p-2'>
                <div className='offset-6 col-3 text-end'>
                    <Btn className="ml-2" label={'Apagar Cep'} type='clean' actionButton={actionButton} isDisabled={!searchByCep}/>
                </div>
                <div className='col-3 text-start'>
                 <Btn label={'Buscar'} type='send' actionButton={actionButton}/>
                </div>
            </div>

            {mostrarCard && 
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-4 ">
                 {jsonExample.Ongs.map((item) => {
                    return (
                <div className="col d-flex justify-content-center">
                <div className="card">
                    <div className="mt-2">
                    <h5 className="cardTitle">Contato para informações</h5>

                    <p className="mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                        <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z"/>
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                    </svg>
                        &nbsp; {item.nome}
                    </p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                        &nbsp; {item.endereco}
                    </p>
                    <p>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg>
                        &nbsp; {item.Telefone}
                    </p>
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
                    &nbsp; {item.email}</p>
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                    </svg>
                    &nbsp; {item.site}</p>
                    </div>
                </div>
                </div>
            )})} 
          </div>
            }

        </div>
    )
}
