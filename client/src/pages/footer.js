export default function Footer() {
    return(
        <footer className="bg-white dark:bg-gray-900 ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a className="hover:underline">Nghe Thi Thanh Tam</a>
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://www.facebook.com/thanhtam.526508/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                                </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://www.linkedin.com/in/t%C3%A2m-thanh-899284286/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M15.333 0H4.667A4.669 4.669 0 0 0 0 4.667v10.666A4.669 4.669 0 0 0 4.667 20h10.666A4.669 4.669 0 0 0 20 15.333V4.667A4.669 4.669 0 0 0 15.333 0ZM7.125 15.333H4.583V8.417h2.542v6.916ZM5.854 7.229a1.312 1.312 0 1 1 .916-2.229 1.312 1.312 0 0 1-.916 2.229Zm10.646 8.104h-2.541v-3.5c0-.833-.021-1.904-1.167-1.904-1.167 0-1.354.917-1.354 1.854v3.55h-2.542V8.417h2.438v.917h.033a2.675 2.675 0 0 1 2.417-1.333c2.583 0 3.063 1.708 3.063 3.938v3.396Z"/>
                            </svg>
                            <span className="sr-only">LinkedIn account</span>
                        </a>
                        <a href="https://github.com/NTThanhTam" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}