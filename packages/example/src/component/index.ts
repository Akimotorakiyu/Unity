import { PargraphNodeComponent } from './pargraph'
import { TextNodeComponent } from './text'
import { DocNodeComponent } from './doc'
import { HeadingNodeComponent } from './heading'
import { contentNodeComponentMap } from './inner/contentNodeComponentMap'
contentNodeComponentMap.set('pargraph', PargraphNodeComponent as any)
contentNodeComponentMap.set('text', TextNodeComponent as any)
contentNodeComponentMap.set('doc', DocNodeComponent as any)
contentNodeComponentMap.set('heading', HeadingNodeComponent as any)
