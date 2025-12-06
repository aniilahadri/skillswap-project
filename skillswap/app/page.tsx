import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section id="home">
        <div id="main-image" className="min:h-[500px] bg-cover bg-center relative mt-20">
          <Image src="/grouplg.jpg" alt="" className="w-full h-full object-cover absolute mix-blend-overlay" fill />
          <div className="md:p-24 p-10 flex flex-col items-center justify-center text-center relative gap-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 bg-white px-4  bg-opacity-40 rounded-xl md:h-[50px]">
              Trade knowledge, not Cash!
            </h1>
            <p className="text-base lg:text-3xl md:text-2xl mb-8 text-white  bg-black px-4  bg-opacity-40 rounded-xl lg:mt-4">
              Connect with people who have the skills you want to learn,
              while sharing your own expertise.<br />
              Create meaningful exchanges that benefit everyone.
            </p>
            <div className="flex h-[70px] items-center justify-center relative lg:mt-20 md:mt-10 mt-5">
              <Link href="/signin"
                className="p-4 md:p-6 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/80"
              >
                Start Skill Swapping ➔
              </Link>
              <Link href="/discover"
                className="p-4 md:p-6 bg-black text-white rounded-2xl font-semibold hover:bg-black/80 ml-4"
              >
                ➤ &nbsp;Explore Community
              </Link>
            </div>
          </div>
        </div>
        <section id="container-features" className="py-10 md:py-12 lg:py-16 bg-gray-100/30 ">
          <div id="features" className="text-gray p-2">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl text-gray-600 font-semibold md:text-4xl">Why Choose SkillSwap?</h1>
              <p className="text-l md:text-xl mt-3 p-2">Experience the future of professional development through peer-to-peer skill exchange</p>
            </div>
            <div id="container-box" className="flex p-10 items-center justify-center gap-10 flex-col md:flex-row md:px-12 md:py-12 md:gap-20 text-center">
              <article className="rounded-lg border border-gray-300 bg-slate-50 p-6 shadow-xs transition hover:shadow-lg lg:p-8 max-w-96 text-center md:max-w-100">
                <span className="inline-block rounded-sm bg-gradient-to-br from-blue-400 to-primary p-3">
                  <img src="/connect.png" alt="" />
                </span>

                <Link href="#">
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                    Connect & Learn
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Connect with others and exchange skills in a safe, verified environment.
                </p>
              </article>
              <article className="rounded-lg border border-gray-300 bg-slate-50 p-6 shadow-xs transition hover:shadow-lg lg:p-8 max-w-96 text-center md:max-w-100">
                <span className="inline-block rounded-sm  bg-gradient-to-br from-blue-400 to-primary p-3">
                  <img src="/lightning.png" alt="" />
                </span>

                <Link href="#">
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                    Instant Matching
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Our algorithm will find you the perfect candidates that match your skills.
                </p>
              </article>
              <article className="rounded-lg border border-gray-300 bg-slate-50 p-6 shadow-xs transition hover:shadow-lg lg:p-8 max-w-96 text-center md:max-w-100">
                <span className="inline-block rounded-sm bg-gradient-to-br from-blue-400 to-primary p-3">
                  <img src="/secure.png" alt="" />
                </span>

                <Link href="#">
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                    Trusted Community
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Verified profiles and community ratings ensure quality interactions.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section id="work-container" className="pb-10 md:pb-24 bg-gray-100/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl text-gray-600 font-semibold md:text-4xl">How It Works</h1>
              <p className="text-l md:text-xl mt-3 p-2">Get started in minutes and begin your skill-swapping journey</p>
            </div>
            <div className="flex gap-6 mt-10 flex-col md:flex-row">
              <div className="xl:p-4 flex flex-col items-center justify-center text-center">
                <div
                  className="w-12 h-12 rounded-full text-xl inline-flex items-center justify-center bg-primary text-white mb-4">
                  1
                </div>
                <h4 className="font-medium text-2xl mb-4">Create Profile</h4>
                <p className="opacity-80 mb-0">
                  List your skills and what you want to learn.
                </p>
              </div>

              <div className="xl:p-4 flex flex-col items-center justify-center text-center">
                <div
                  className="w-12 h-12 rounded-full text-xl inline-flex items-center justify-center bg-primary text-white mb-4">
                  2
                </div>
                <h4 className="font-medium text-2xl mb-4">Find Matches</h4>
                <p className="opacity-80 mb-0">
                  Browse and connect with compatible skill partners.
                </p>
              </div>

              <div className="xl:p-4 flex flex-col items-center justify-center text-center">
                <div
                  className="w-12 h-12 rounded-full text-xl inline-flex items-center justify-center bg-primary text-white mb-4">
                  3
                </div>
                <h4 className="font-medium text-2xl mb-4">Exchange</h4>
                <p className="opacity-80 mb-0">
                  Scheule sessions and start earnign together.
                </p>
              </div>

              <div className="xl:p-4 flex flex-col items-center justify-center text-center">
                <div
                  className="w-12 h-12 rounded-full text-xl inline-flex items-center justify-center bg-primary text-white mb-4">
                  4
                </div>
                <h4 className="font-medium text-2xl mb-4">Rate & Grow</h4>
                <p className="opacity-80 mb-0">Leave feedback and buid your reputation</p>
              </div>
            </div>
          </div>
        </section>
        {/* MAYBE MAKE FLEX */}
        <section id="rating-container" className="pb-10 md:pb-20 text-zinc-900 bg-gray-100/30">
          <div className="container px-4 mx-auto">
            <div className="flex justify-center md:mb-6">
              <div className="sm:max-w-lg text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h1>
                <p className="text-l md:text-xl mt-2 p-2">
                  Real experiences from real skill swappers!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6 pt-8">
              <div className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="bg-white shadow-xl  rounded-2xl transition duration-300 h-full p-6">
                  <div className="mt-4">
                    <p className="opacity-50 mb-6">
                      "I learned Python from an expert while teaching React. The platform made it so easy to find the right match!"
                    </p>
                    <hr />
                    <div className="flex items-center">
                      <div>
                        <h4 className="text-xl font-medium">Sarah Chen</h4>
                        <p className="text-md"><i className="text-gray-500">Software Engineer</i></p>
                        <p className="text-sm mt-1">
                          <span className="border px-2 rounded-lg text-center">React</span>
                          <span className="border px-2 rounded-lg text-center ml-2">Python</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="bg-white shadow-xl  rounded-2xl transition duration-300 h-full p-6">
                  <div className="mt-4">
                    <p className="opacity-50 mb-6">
                      "Amazing community! I've comleted 8 skill swaps and learned a lot!"
                    </p>
                    <hr />
                    <div className="flex items-center">
                      <div>
                        <h4 className="text-xl font-medium">Michael Rodriguez</h4>
                        <p className="text-md"><i className="text-gray-500">UI Design</i></p>
                        <p className="text-sm mt-1">
                          <span className="border px-2 rounded-lg text-center">Design</span>
                          <span className="border px-2 rounded-lg text-center ml-2">ML</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="bg-white shadow-xl  rounded-2xl transition duration-300 h-full p-6">
                  <div className="mt-4">
                    <p className="opacity-50 mb-6">
                      "The quality of learning together is outstanding.<br />Every swap has been valuable and well-structured."
                    </p>
                    <hr />
                    <div className="flex items-center">
                      <div>
                        <h4 className="text-xl font-medium">Emily Johnson</h4>
                        <p className="text-md"><i className="text-gray-500">Data Scientist</i></p>
                        <p className="text-sm mt-1">
                          <span className="border px-2 rounded-lg text-center">Data Science</span>
                          <span className="border px-2 rounded-lg text-center ml-2">Marekting</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="end-section" className="py-10 md:py-12 lg:py-16 bg-gray-100/30">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl text-gray-800 font-semibold md:text-4xl">Ready to Start Your Skill Journey?</h1>
            <p className="text-l md:text-xl mt-3 p-2">Join thousands of students and professionals who are accelerating their careers through skill exchange.</p>
            <button className="py-4 px-10 md:py-6 md:px-12 mt-6 bg-gradient-to-br from-blue-400 to-primary  text-white rounded-2xl font-semibold hover:to-blue-700">
              <Link href="/signup">Join SkillSwap ➔</Link>
            </button>
          </div>
        </section>
      </section >

    </>
  );
}

