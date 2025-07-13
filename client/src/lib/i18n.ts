import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        about: "About",
        products: "Products", 
        solutions: "Solutions",
        catalogue: "Catalogue",
        education: "Education",
        newsroom: "Newsroom",
        contact: "Contact"
      },
      // Common
      common: {
        loading: "Loading...",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        viewAll: "View All",
        readMore: "Read More",
        download: "Download",
        contact: "Contact",
        submit: "Submit",
        cancel: "Cancel",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        add: "Add",
        close: "Close",
        back: "Back",
        next: "Next",
        previous: "Previous",
        language: "Language"
      },
      // Home page
      home: {
        hero: {
          title: "Rehabilitation Equipment & Solutions",
          subtitle: "Empowering independence through innovative assistive technology and personalized care solutions for enhanced quality of life."
        },
        aboutSection: {
          title: "About AbleTools",
          subtitle: "Your ability to dream!",
          description: "Leading provider of rehabilitation equipment and assistive technology solutions in Cyprus, dedicated to enhancing independence and quality of life for individuals with disabilities."
        },
        productsSection: {
          title: "Our Products",
          subtitle: "Comprehensive range of rehabilitation equipment and assistive technology"
        }
      },
      // Products
      products: {
        title: "Products",
        categories: "Categories",
        searchPlaceholder: "Search products...",
        sortBy: "Sort by",
        sortOptions: {
          name: "Name",
          featured: "Featured",
          newest: "Newest"
        },
        viewModes: {
          grid: "Grid View",
          list: "List View"
        }
      },
      // Admin
      admin: {
        title: "Admin Dashboard",
        navigation: {
          dashboard: "Dashboard",
          products: "Products",
          categories: "Categories", 
          seminars: "Seminars",
          events: "Events",
          users: "Users",
          enquiries: "Enquiries",
          catalogue: "Catalogue",
          settings: "Settings"
        },
        actions: {
          addNew: "Add New",
          edit: "Edit",
          delete: "Delete",
          view: "View",
          save: "Save",
          cancel: "Cancel"
        },
        forms: {
          title: "Title",
          titleEn: "Title (English)",
          titleEl: "Title (Greek)",
          description: "Description",
          descriptionEn: "Description (English)",
          descriptionEl: "Description (Greek)",
          category: "Category",
          image: "Image",
          price: "Price",
          specifications: "Specifications",
          specificationsEn: "Specifications (English)",
          specificationsEl: "Specifications (Greek)",
          status: "Status",
          active: "Active",
          inactive: "Inactive"
        }
      }
    }
  },
  el: {
    translation: {
      // Navigation  
      nav: {
        home: "Αρχική",
        about: "Σχετικά",
        products: "Προϊόντα",
        solutions: "Λύσεις", 
        catalogue: "Κατάλογος",
        education: "Εκπαίδευση",
        newsroom: "Ειδήσεις",
        contact: "Επικοινωνία"
      },
      // Common
      common: {
        loading: "Φόρτωση...",
        search: "Αναζήτηση",
        filter: "Φίλτρο",
        sort: "Ταξινόμηση",
        viewAll: "Προβολή Όλων",
        readMore: "Διαβάστε Περισσότερα",
        download: "Λήψη",
        contact: "Επικοινωνία",
        submit: "Υποβολή",
        cancel: "Ακύρωση",
        save: "Αποθήκευση",
        edit: "Επεξεργασία",
        delete: "Διαγραφή",
        add: "Προσθήκη",
        close: "Κλείσιμο",
        back: "Πίσω",
        next: "Επόμενο",
        previous: "Προηγούμενο",
        language: "Γλώσσα"
      },
      // Home page
      home: {
        hero: {
          title: "Εξοπλισμός & Λύσεις Αποκατάστασης",
          subtitle: "Ενδυναμώνουμε την ανεξαρτησία μέσω καινοτόμων βοηθητικών τεχνολογιών και εξατομικευμένων λύσεων φροντίδας για βελτιωμένη ποιότητα ζωής."
        },
        aboutSection: {
          title: "Σχετικά με την AbleTools",
          subtitle: "Η ικανότητά σας να ονειρεύεστε!",
          description: "Κορυφαίος πάροχος εξοπλισμού αποκατάστασης και λύσεων βοηθητικής τεχνολογίας στην Κύπρο, αφιερωμένος στην ενίσχυση της ανεξαρτησίας και της ποιότητας ζωής για άτομα με αναπηρίες."
        },
        productsSection: {
          title: "Τα Προϊόντα μας",
          subtitle: "Ολοκληρωμένη γκάμα εξοπλισμού αποκατάστασης και βοηθητικής τεχνολογίας"
        }
      },
      // Products
      products: {
        title: "Προϊόντα",
        categories: "Κατηγορίες",
        searchPlaceholder: "Αναζήτηση προϊόντων...",
        sortBy: "Ταξινόμηση κατά",
        sortOptions: {
          name: "Όνομα",
          featured: "Προτεινόμενα",
          newest: "Νεότερα"
        },
        viewModes: {
          grid: "Προβολή Πλέγματος",
          list: "Προβολή Λίστας"
        }
      },
      // Admin
      admin: {
        title: "Πίνακας Διαχείρισης",
        navigation: {
          dashboard: "Πίνακας",
          products: "Προϊόντα",
          categories: "Κατηγορίες",
          seminars: "Σεμινάρια",
          events: "Εκδηλώσεις",
          users: "Χρήστες",
          enquiries: "Ερωτήματα",
          catalogue: "Κατάλογος",
          settings: "Ρυθμίσεις"
        },
        actions: {
          addNew: "Προσθήκη Νέου",
          edit: "Επεξεργασία",
          delete: "Διαγραφή",
          view: "Προβολή",
          save: "Αποθήκευση",
          cancel: "Ακύρωση"
        },
        forms: {
          title: "Τίτλος",
          titleEn: "Τίτλος (Αγγλικά)",
          titleEl: "Τίτλος (Ελληνικά)",
          description: "Περιγραφή",
          descriptionEn: "Περιγραφή (Αγγλικά)",
          descriptionEl: "Περιγραφή (Ελληνικά)",
          category: "Κατηγορία",
          image: "Εικόνα",
          price: "Τιμή",
          specifications: "Προδιαγραφές",
          specificationsEn: "Προδιαγραφές (Αγγλικά)",
          specificationsEl: "Προδιαγραφές (Ελληνικά)",
          status: "Κατάσταση",
          active: "Ενεργό",
          inactive: "Ανενεργό"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;