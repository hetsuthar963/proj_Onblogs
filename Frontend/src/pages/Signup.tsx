import Quote from '../components/Quote'
import Auth from '../components/Auth'
import { Partical } from '../components/Partical'

export default function Signup() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div>
             <Auth type="signup" />
        </div>
        <div className='hidden lg:block'>
            <Quote />
        </div>
    </div>
  )
}

