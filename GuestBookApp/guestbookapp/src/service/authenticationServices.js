import axios from "axios";


class AuthService {
  async login(username, password) {
    const response = await axios.post("http://localhost:8000/user/login", {
      "email": username,
      "password": password
    })
    console.log(response.data)
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(response.data)
    return response.data
  }
  //user logout 

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, email, password, password2) {
    console.log(firstName, lastName, email, password, password2)
    return axios.post("http://localhost:8000/user/register", {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "confirmPassword": password2
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();