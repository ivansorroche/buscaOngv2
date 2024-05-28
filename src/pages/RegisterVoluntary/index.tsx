import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Voluntary } from '@/model/voluntary';
import Btn from '@/components/Btn/Btn';
import Modal from '@/components/Modal/Modal';
import { helpers } from '@/helpers/helpers';
import { cep } from '@/service/cep';

export default function RegisterVoluntary() {
  const [voluntary, setVoluntary] = useState<Voluntary>({
    firstName: '',
    lastName: '',
    phone: '',
    mail: '',
    cep: '',
    street: '',
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
      voluntary.firstName &&
      voluntary.lastName &&
      voluntary.phone &&
      voluntary.mail &&
      voluntary.cep &&
      voluntary.street &&
      voluntary.neighbourhood &&
      voluntary.city &&
      voluntary.state
    );

    if (formValid) {
      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(voluntary),
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

  function phoneMask(value: any) {
    if (value) {
      const phoneMasked = value
        .replace(/\D/g, '')
        .substring(0, 11)
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2');

      setVoluntary({ ...voluntary, phone: phoneMasked });
    }
  }

  function closeModal() {
    setModal({
      open: false,
      reason: ''
    });

    if (modal.reason === 'Valid') {
      setVoluntary({
        firstName: '',
        lastName: '',
        phone: '',
        mail: '',
        cep: '',
        street: '',
        neighbourhood: '',
        city: '',
        state: '',
        moreInfo: ''
      });
    }
  }

  useEffect(() => {
    console.log('entrou no useEffect')
    if (voluntary.cep.length === 8){
    console.log('tem tamanho 8')

      searchAddress()
    }
  },[voluntary.cep])

  async function searchAddress() {
    const response = await cep.seachAddress(voluntary.cep)

    if (response.erro === true) {
      alert('Cep digitado é invalido!')
    } else {
      setVoluntary({
        ...voluntary,
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
      <div className={styles.main}>
        <h1>Cadastro de Voluntario</h1> <br />
        <h3>Informe seus dados para realizarmos o cadastro</h3><br /><br /><br />

        <div className="container text-center">
          {/* FirstName and LastName */}
          <div className="row">
            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, firstName: e.target.value })}
                value={voluntary.firstName}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Primeiro Nome"
                maxLength={30}
                aria-label="VoluntaryName"
                aria-describedby="basic-addon1" />
            </div>

            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, lastName: e.target.value })}
                value={voluntary.lastName}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Sobrenome"
                maxLength={15}
                aria-label="VoluntaryLastName"
                aria-describedby="basic-addon1" />
            </div>
          </div>

          {/* Phone and Mail */}
          <div className="row mt-2">
            <div className="input-group col">
              <input
                onChange={(e) => phoneMask(e.target.value)}
                value={voluntary.phone}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Telefone/Cel"
                maxLength={30}
                aria-label="VoluntaryPhone"
                aria-describedby="basic-addon1" />
            </div>

            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, mail: e.target.value })}
                value={voluntary.mail}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="E-mail"
                maxLength={45}
                aria-label="VoluntaryMail"
                aria-describedby="basic-addon1" />
            </div>
          </div>

          {/* Cep, Street and Neighbourhood */}
          <div className="row mt-2">
            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, cep: e.target.value })}
                value={voluntary.cep}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="CEP"
                maxLength={8}
                aria-label="VoluntaryCep"
                aria-describedby="basic-addon1" />
            </div>

            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, street: e.target.value })}
                value={voluntary.street}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Rua"
                maxLength={20}
                aria-label="VoluntaryStreet"
                disabled={true}
                aria-describedby="basic-addon1" />
            </div>

            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, neighbourhood: e.target.value })}
                value={voluntary.neighbourhood}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Bairro"
                maxLength={20}
                aria-label="VoluntaryNeighbourhood"
                disabled={true}
                aria-describedby="basic-addon1" />
            </div>
          </div>

          {/* City and State */}
          <div className="row mt-2">
            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, city: e.target.value })}
                value={voluntary.city}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Cidade "
                maxLength={12}
                disabled={true}
                aria-label="VoluntaryCity"
                aria-describedby="basic-addon1" />
            </div>

            <div className="input-group col">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, state: e.target.value })}
                value={voluntary.state}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Estado"
                maxLength={12}
                disabled={true}
                aria-label="voluntaryState"
                aria-describedby="basic-addon1" />
            </div>


            {/* Verificar depois, area de atuação */}
            <div className="input-group mt-2">
              <input className={`${styles.inputStyle} form-control`} type="text" placeholder='Escolha as areas de interesse...' disabled={true} />
            </div>

            {/* More Information */}
            <div className="input-group mt-2 input-group-lg">
              <input
                onChange={(e) => setVoluntary({ ...voluntary, moreInfo: e.target.value })}
                value={voluntary.moreInfo}
                type="text"
                className={`${styles.inputStyle} form-control`}
                placeholder="Bio, conte um pouco sobre você"
                maxLength={200}
                aria-label="voluntaryMoreInfo"
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
    </div>
  );
}
