
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service"
import SessionUser from "../interfaces/sessionUser.interface";
import { environment } from "../../environments/environment.prod";
import 'jest-fetch-mock';
import { initializeApp } from "@angular/fire/app";
import { AngularFireModule } from "@angular/fire/compat";

describe('login-service', () => {
    let authentication: AuthenticationService;
    let sessionUser = {} as SessionUser;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [initializeApp(environment.firebaseConfig), AngularFireModule],
          providers: [AuthenticationService]
        }).compileComponents();
        authentication = TestBed.inject(AuthenticationService);
      });

    it('Checking login response', async () => {
        let user_password = [
            {'email':'test','password':'test1233','login':false},
            {'email':'test@test.cl','password':'test1233','login':false},
            {'email':'tdst500@test.cl','password':'test1234','login':false},
            {'email':'test1@test.cl','password':'ttestt','login':false},
            {'email':'','password':'clav23','login':false},
            {'email':'test1@test.cl','password':'','login':false},
            {'email':'test1@test.cl','password':'clav23','login':true},
        ]
        for(let session of user_password) {
            sessionUser = {} as SessionUser;
            sessionUser.correoUsuario = session.email;
            sessionUser.clave = session.password;
            expect(await authentication.login(sessionUser)).toBe(session.login);
        }
    })
})