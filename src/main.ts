import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
import HelloWorld from './widgets/HelloWorld';
import { host } from './config';

const Projector = ProjectorMixin(HelloWorld);
const projector = new Projector();
projector.setProperties({ name: host });

projector.append();
