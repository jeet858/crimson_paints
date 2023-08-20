import * as React from "react";

const LoginTemplate:React.FunctionComponent=(props)=>{
    return(
        <div className="bg-center bg-cover bg-no-repeat flex items-center justify-center h-screen ">
            <div className="w-full max-w-md p-6 bg-white rounded-lg drop-shadow-2xl grid justify-items-center border-2 border-stone-950">
                <h2 className="text-2xl font-semibold mb-6 ">Login</h2>
                <br/>
                <span>Hey, Enter your details to get sign in to your account </span>
                <br/>
                <br/>
                <br/>
                < form className="grid justify-items-center">
                <div className="mb-4">
                    <input type="text" id="username" name="username" placeholder="Enter  Email / Phone No" required className="w-96 hover:shadow-md px-3 py-2  border focus:outline-none focus:border-blue-500 rounded-lg"/>
                </div>
            
                <div className="mb-4">
                    <div className="relative">
                            <input type="password" id="password" name="password" placeholder="Password" required className="w-96 hover:shadow-md px-3 py-2  border focus:outline-none focus:border-blue-500 rounded-lg"/>
                            <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-blue-500" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
                                    <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#999691" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#BDBBB9" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                    </div>
                    <div className="text-gray-500 text-right text-sm">Forgot Password?</div>
                </div>
            <br/>
            <br/>
            <button type="submit" className="w-24 bg-indigo-700 text-white font-semibold py-2 px-4 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 rounded-full">Login</button>
            <br/>
            <br/>
            <span>Don’t have an account? Sign up now</span>
            <br/>
            <br/>
            </form>
        </div>
    </div>
    )
}

export default LoginTemplate