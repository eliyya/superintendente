import { WelcomeModel } from '../../models/welcome/supabase.js'
import { WelcomeController } from '../welcome.js'
import { AutoroleModel } from '../../models/autorol/supabase.js'
import { AutorolController } from '../autorol.js'

export const welcomeController = new WelcomeController(new WelcomeModel())
export const autorolController = new AutorolController(new AutoroleModel())
