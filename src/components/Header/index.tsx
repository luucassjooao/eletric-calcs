import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { routesPath } from '@/app/routes';
import { ListItem } from './ListItem';

const components: {
  labelButton: string;
  infos: [{ title: string; href: string; description: string }];
}[] = [
  {
    labelButton: 'Transformador',
    infos: [
      {
        title: 'Infomações trafo pelo secundario',
        href: routesPath.infosTrafoBySecundarySide,
        description:
          'Conseguindo as informações do trafo por informações do secundario',
      },
    ],
  },
  {
    labelButton: 'Eficiência Energetica',
    infos: [
      {
        title: 'Corrigir fator de potência',
        href: routesPath.CorrectingThePowerFactor,
        description:
          'Saiba quanto é seu fator de potência, e saiba como corrigir',
      },
    ],
  },
];

export function Header() {
  return (
    <div className="justify-center items-center flex h-16 border-2 border-b-purple-700">
      <NavigationMenu>
        <NavigationMenuList>
          {components.map((component) => (
            <NavigationMenuItem className='border-2 border-purple-500 rounded-md' >
              <NavigationMenuTrigger>
                {component.labelButton}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {component.infos.map((h) => (
                    <ListItem key={h.title} title={h.title} href={h.href}>
                      {h.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
