import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Ong } from '@/model/ong';
import Btn from '@/components/Btn/Btn';
import Modal from '@/components/Modal/Modal';
import { cep } from "../../service/cep"


export default function RegisterOng() {
  const [ong, setOng] = useState<Ong>({
    name: '',
    cnpj: '',
    mail: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    neighbourhood: '',
    city: '',
    state: '',
    moreInfo: ''
  });

  const [modal, setModal] = useState({
    open: false,
    reason: ''
  });

  async function actionButton() {
    const formValid = (
      ong.name &&
      ong.cnpj && 
      ong.mail &&
      ong.phone  && 
      ong.cep &&
      ong.street &&
      ong.number &&
      ong.neighbourhood &&
      ong.city &&
      ong.state
    );

    if (formValid) {
      try {
        const res = await fetch('/api/ongs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ong),
        });

        if (res.ok) {
          setModal({
            open: true,
            reason: 'Valid'
          });
        } else {
          setModal({
            open: true,
            reason: 'Invalid'
          });
        }
      } catch (error) {
        setModal({
          open: true,
          reason: 'Invalid'
        });
      }
    } else {
      setModal({
        open: true,
        reason: 'Invalid'
      });
    }
  }

  function closeModal() {
    setModal({
      open: false,
      reason: ''
    });

    if (modal.reason === 'Valid') {
      setOng({
        name: '',
        cnpj: '',
        mail: '',
        phone: '',
        cep: '',
        street: '',
        number: '',
        neighbourhood: '',
        city: '',
        state: '',
        moreInfo: ''
      });
    }
  }

  useEffect(() => {
    console.log('entrou no useEffect')
    if (ong.cep.length === 8){
    console.log('tem tamanho 8')

      searchAddress()
    }
  },[ong.cep])

   async function searchAddress() {
    const response = await cep.seachAddress(ong.cep)

    if (response.erro === true) {
      alert('Cep digitado é invalido!')
    } else {
      setOng({
        ...ong,
        street: response.logradouro,
        neighbourhood: response.bairro,
        city: response.localidade,
        state: response.uf
      })
    }
    console.log(response, 'RESPONSE')

  }

  return (
    <div className={`${styles.main} text-center`}>
      <h1>Cadastro de Ong</h1> <br />
      <h3 className='col-4 offset-4'>Informe os dados da ONG para realizarmos o cadastro.</h3><br /><br /><br />

      <div className="container text-center">
        {/* Name and CNPJ */}
        <div className="row">
          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, name: e.target.value })}
              value={ong.name}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Nome da ONG"
              maxLength={30}
              aria-label="OngName"
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, cnpj: e.target.value })}
              value={ong.cnpj}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="CNPJ"
              maxLength={15}
              aria-label="OngCNPJ"
              aria-describedby="basic-addon1" />
          </div>
        </div>

        {/* Mail and Phone */}
        <div className="row mt-2">
          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, mail: e.target.value })}
              value={ong.mail}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="e-mail"
              maxLength={30}
              aria-label="OngMail"
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, phone: e.target.value })}
              value={ong.phone}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Telefone/Cel"
              maxLength={15}
              aria-label="OngPhone"
              aria-describedby="basic-addon1" />
          </div>
        </div>

        {/* Cep, Street and Number */}
        <div className="row mt-2">
          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, cep: e.target.value })}
              value={ong.cep}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="CEP"
              maxLength={8}
              aria-label="OngCep"
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, street: e.target.value })}
              value={ong.street}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Rua"
              maxLength={20}
              aria-label="OngStreet"
              disabled={true}
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, number: e.target.value })}
              value={ong.number}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Número"
              maxLength={6}
              aria-label="OngNumber"
              aria-describedby="basic-addon1" />
          </div>
        </div>

        {/* Neighbourhood, city and State */}
        <div className="row mt-2">
          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, neighbourhood: e.target.value })}
              value={ong.neighbourhood}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Bairro"
              maxLength={12}
              aria-label="OngNeighbourhood"
              disabled={true}
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, city: e.target.value })}
              value={ong.city}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Cidade"
              maxLength={12}
              aria-label="OngCity"
              disabled={true}
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group col">
            <input
              onChange={(e) => setOng({ ...ong, state: e.target.value })}
              value={ong.state}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Estado"
              maxLength={12}
              aria-label="OngState"
              disabled={true}
              aria-describedby="basic-addon1" />
          </div>

          {/* Verificar depois, area de atuação */}
          <div className="input-group mt-2">
            <input className={`${styles.inputStyle} form-control`} type="text" placeholder='Escolha as áreas de interesse...' disabled={true} />
          </div>

          {/* More Information */}
          <div className="input-group mt-2 input-group-lg">
            <input
              onChange={(e) => setOng({ ...ong, moreInfo: e.target.value })}
              value={ong.moreInfo}
              type="text"
              className={`${styles.inputStyle} form-control`}
              placeholder="Para mais informações"
              maxLength={200}
              aria-label="OngMoreInfo"
              aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className='text-end mt-2'>
          <Btn label={'Enviar'} type='send' actionButton={actionButton} />
        </div>
      </div>
      {modal.open &&
        <Modal
          formValid={modal.reason}
          closeModal={closeModal}
        />
      }
    </div>
  );
}
