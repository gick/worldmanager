
   exports.items=  function () {
       return [
          {
             label: 'Import ontology',
             icon: 'pi pi-fw pi-file',
             to:'/'
          },
          {
             label: 'Explore ontologies',
             icon: 'pi pi-fw pi-map',
             to : '/explore'   
            },

            {
               label: 'Classe inspector',
               icon: 'pi pi-fw pi-map',
               to : '/class'   
              },
  

          {
             label: 'Help',
             icon: 'pi pi-fw pi-search',
             items: [
                {
                   label: 'About',
                   icon: 'pi pi-fw pi-pencil',
                   to: '/about'
                },
             ]
          },
 
       ]
    }
 
 
 