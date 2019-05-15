import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Footer from './Footer'
import Header from './Header'


class App extends Component {
  state = {}
  render() {
    return (
      <form>
        <div class="container">

          <Header />

          <div class="marginTop">




            <div class="row">
              <div class="col col-lg-2 aaa">
                <label for="exampleInputPassword1" className="margin">Enter the key:</label>
              </div>

              <div class="col col-md-4">
                <input type="password" class="form-control margin is-valid" id="validationServerUsername" placeholder="password" aria-describedby="inputGroupPrepend3" required />
                <div class="invalid-feedback margin2">
                  Please choose a username.
              </div>
              </div>

              <div class="col col-lg-2">
              </div>
            </div>


            <div class="row">
              <div class="col col-lg-2 aaa">
                <label for="exampleFormControlTextarea1" className="margin">Message:</label>
              </div>

              <div class="col col-md-4">
                <textarea class="form-control margin is-valid" id="exampleFormControlTextarea1" placeholder="Enter a message" rows="5" aria-describedby="inputGroupPrepend3" required />
                <div class="invalid-feedback margin2">
                  Please choose a username.
              </div>
              </div>


              <div class="col col-lg-2 margin">
                <button type="button" class="btn btn-outline-primary btnBreak2">Encryption</button>
                <button type="button" class="btn btn-outline-primary btnBreak">Decryption</button>
                <button type="button" class="btn btn-outline-primary btnBreak2">Reset</button>
              </div>

            </div>



            <div class="row">
              <div class="col col-lg-2 aaa">
                <label for="exampleInputEmail1" className="margin">E-mail:</label>
              </div>

              <div class="col col-md-4">
                <input type="email" class="form-control margin is-valid" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Send a message to your friend" />

                <div class="invalid-feedback margin2">
                  Please choose a username.
              </div>
              </div>

              <div class="col col-lg-2">
                <button class="btn btn-outline-primary btnBreak2" type="submit">Send</button>
              </div>

            </div>




          </div>
        </div>


        <Footer />

      </form>
    );
  }
}


export default App;
