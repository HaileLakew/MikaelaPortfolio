import { TypeAnimation } from 'react-type-animation';

export default function Introduction() {


    return(
        <div className="flex flex-col text-[#B86F52] 
            h-screen w-screen snap-center font-lato text-4xl xl:text-8xl leading-[140%] m-6 sm:m-24 max-w-fit">
    
                <div className='mt-[10%]'>
                    {`Hi there! I’m Mikaela, a Graphic Designer from the beautiful PNW. 
                        My passion is design and aesthetics. I can help you build a `}
              
                        <TypeAnimation
                            sequence={[
                                ` successful brand.`, 2000,
                                ` thriving business.`, 2000,
                                ` beautiful logo.`,2000]}
                            speed={2}
                            style={{ background: '#B86F52', color: '#f2ebe3' }}
                            wrapper="span" 
                            repeat={Infinity}
                        />
    
                </div>
     
            <div>
               {`Don’t be shy, get in touch!`} 
            </div>
        </div>
    );
}