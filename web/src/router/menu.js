
exports.items = function () {
   return [
      {
         label: 'Import ontology',
         icon: 'pi pi-fw pi-file',
         to: '/'
      },
      {
         label: 'Explore ontologies',
         icon: 'pi pi-fw pi-map',
         to: '/explore'
      },

      {
         label: 'Classe inspector',
         icon: 'pi pi-fw pi-map',
         to: '/class'
      },
      {
         label: 'Builder',
         items: [{
            label: 'Rules management',
            icon: 'pi pi-fw pi-sitemap',
            to: '/rules'
         },
         {
            label: 'Query management',
            icon: 'pi pi-fw pi-sitemap',
            to: '/query'
         },
         {
            label: 'Query Viewer',
            icon: 'pi pi-fw pi-sitemap',
            to: '/queryView'
         }]
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


