import {
  attributes as ServicesAttributes,
  react as ServicesContent,
} from '../../../content/services.md';
import CloudinaryImage from '../../components/cloudinary-image';
import { ContactForm } from '../../components/pages/Services/Form';
import { importServices } from '../../components/services/service-data';
import { comparePriorities } from '../../lib/compare-priorities';

export default async function Services() {
  const servicesMarkdownData = await importServices();

  const services = servicesMarkdownData.map(
    (localServiceMarkdownData) => localServiceMarkdownData.attributes
  );

  services.sort(comparePriorities);

  return (
    <main className='items-center p-4'>
      <div className='container justify-center'>
        <ServicesContent />
      </div>

      <div className='container'>
        {/* allow shrinking on smaller screens */}
        <div className='w-full'>
          <div className='w-full justify-center'>
            <div>
              <ContactForm
                services={services}
                step0Header={ServicesAttributes.step0_header}
                step1Header={ServicesAttributes.step1_header}
                attributionFieldPrompt={
                  ServicesAttributes.attribution_field_prompt
                }
                attributionFieldOptions={
                  ServicesAttributes.attribution_field_options
                }
              ></ContactForm>
            </div>
          </div>
        </div>
      </div>
      <div className='container flex-row justify-evenly p-4 gap-2'>
        <div className='w-full relative min-h-[50vh]'>
          <CloudinaryImage
            className='object-contain'
            height={500}
            width={900}
            src='/dave-peach-web-netlify-cms/march_madness'
            alt='Dave Peach announcing at March Madness in 2021'
            // placeholder='blur'
            // blurDataURL={mainImageBlurDataUrl}
          />
        </div>
      </div>
      <label htmlFor='email'>
        Email Dave
        <a
          className='mt-4 w-full'
          href='mailto:davepeachvoice@gmail.com'
          color='blue'
        />
      </label>
    </main>
  );
}
