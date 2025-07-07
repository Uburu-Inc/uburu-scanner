import Image from "next/image";

function LoginPage() {
  return (
    <main>
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <div className="flex justify-center">
            <div className="relative w-[50px] h-[50px]">
              <Image
                alt=""
                src={"/images/init-scan.png"}
                fill
                className="absolute"
              />
            </div>
          </div>

          <p className="text-center">Coming soon</p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
