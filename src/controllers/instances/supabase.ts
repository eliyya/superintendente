import { WelcomeModel } from '../../models/welcome_config/supabase.js'
import { WelcomeController } from '../welcome_config.js'
import { AutoroleModel } from '../../models/autorol/supabase.js'
import { AutorolController } from '../autorol.js'

export const welcomeController = new WelcomeController(new WelcomeModel())
export const autorolController = new AutorolController(new AutoroleModel())
