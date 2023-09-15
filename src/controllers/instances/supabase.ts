import { WelcomeConfigModel } from '../../models/welcome_config/supabase.js'
import { WelcomeConfigController } from '../welcome_config.js'

export const welcomeConfigController = new WelcomeConfigController(new WelcomeConfigModel())
