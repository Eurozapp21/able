from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import *
from auth import get_password_hash
from datetime import datetime, timedelta

def seed_data():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Create admin user
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            admin_user = User(
                username="admin",
                email="admin@abletools.com.cy",
                password=get_password_hash("admin123"),
                first_name="Admin",
                last_name="User",
                role="admin",
                phone="+357 22 123456",
                address="123 Admin Street",
                city="Nicosia",
                postcode="1234",
                occupation="Administrator"
            )
            db.add(admin_user)
            db.commit()
            print("Admin user created: admin/admin123")
        
        # Create categories
        categories_data = [
            {
                "name": "Wheelchairs & Mobility",
                "name_el": "Αμαξίδια & Κινητικότητα",
                "description": "Professional wheelchairs and mobility solutions",
                "description_el": "Επαγγελματικά αμαξίδια και λύσεις κινητικότητας",
                "icon": "wheelchair",
                "image": "1599058641products_home_1751993768399.jpg"
            },
            {
                "name": "Rehabilitation Equipment",
                "name_el": "Εξοπλισμός Αποκατάστασης",
                "description": "Advanced rehabilitation and therapy equipment",
                "description_el": "Προηγμένος εξοπλισμός αποκατάστασης και θεραπείας",
                "icon": "activity",
                "image": "1601930431PRODUCTS_COVER_1752027894926.jpg"
            },
            {
                "name": "Sensory Integration",
                "name_el": "Αισθητηριακή Ολοκλήρωση",
                "description": "Sensory integration and therapy tools",
                "description_el": "Εργαλεία αισθητηριακής ολοκλήρωσης και θεραπείας",
                "icon": "brain",
                "image": "image_1752008837035.png"
            }
        ]
        
        for cat_data in categories_data:
            existing_cat = db.query(Category).filter(Category.name == cat_data["name"]).first()
            if not existing_cat:
                category = Category(**cat_data)
                db.add(category)
        
        db.commit()
        
        # Create products
        products_data = [
            {
                "name": "Wolturnus W5",
                "name_el": "Wolturnus W5",
                "description": "Professional wheelchair with advanced features",
                "description_el": "Επαγγελματικό αμαξίδιο με προηγμένα χαρακτηριστικά",
                "category_id": 1,
                "images": ["1599058641products_home_1751993768399.jpg"],
                "is_featured": True,
                "specifications": "Lightweight titanium frame, adjustable seating",
                "specifications_el": "Ελαφρύ πλαίσιο τιτανίου, ρυθμιζόμενη καθιστική θέση",
                "price": "Contact for pricing"
            },
            {
                "name": "HUR Rehabilitation System",
                "name_el": "Σύστημα Αποκατάστασης HUR",
                "description": "Advanced pneumatic rehabilitation equipment",
                "description_el": "Προηγμένος πνευματικός εξοπλισμός αποκατάστασης",
                "category_id": 2,
                "images": ["HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg"],
                "is_featured": True,
                "specifications": "Pneumatic resistance, safe for all users",
                "specifications_el": "Πνευματική αντίσταση, ασφαλής για όλους τους χρήστες",
                "price": "Contact for pricing"
            },
            {
                "name": "Sensory Integration Kit",
                "name_el": "Κιτ Αισθητηριακής Ολοκλήρωσης",
                "description": "Complete sensory integration therapy tools",
                "description_el": "Πλήρη εργαλεία θεραπείας αισθητηριακής ολοκλήρωσης",
                "category_id": 3,
                "images": ["image_1752008837035.png"],
                "is_featured": True,
                "specifications": "Various textures and stimulation tools",
                "specifications_el": "Διάφορες υφές και εργαλεία διέγερσης",
                "price": "Contact for pricing"
            }
        ]
        
        for prod_data in products_data:
            existing_prod = db.query(Product).filter(Product.name == prod_data["name"]).first()
            if not existing_prod:
                product = Product(**prod_data)
                db.add(product)
        
        db.commit()
        
        # Create seminars
        seminars_data = [
            {
                "title": "Advanced Rehabilitation Techniques",
                "title_el": "Προηγμένες Τεχνικές Αποκατάστασης",
                "description": "Learn advanced rehabilitation techniques for neurological conditions",
                "description_el": "Μάθετε προηγμένες τεχνικές αποκατάστασης για νευρολογικές παθήσεις",
                "date": datetime.now() + timedelta(days=30),
                "location": "AbleTools Training Center, Nicosia",
                "location_el": "Κέντρο Εκπαίδευσης AbleTools, Λευκωσία",
                "speaker": "Dr. Maria Andreou, PT, PhD",
                "speaker_el": "Δρ. Μαρία Ανδρέου, PT, PhD",
                "image": "seminar_1752044011822.jpeg",
                "fee": "€250",
                "max_participants": 20,
                "type": "seminar"
            },
            {
                "title": "HUR Equipment Certification",
                "title_el": "Πιστοποίηση Εξοπλισμού HUR",
                "description": "Professional certification for HUR rehabilitation equipment",
                "description_el": "Επαγγελματική πιστοποίηση για εξοπλισμό αποκατάστασης HUR",
                "date": datetime.now() + timedelta(days=45),
                "location": "AbleTools Training Center, Nicosia",
                "location_el": "Κέντρο Εκπαίδευσης AbleTools, Λευκωσία",
                "speaker": "HUR Certified Instructor",
                "speaker_el": "Πιστοποιημένος Εκπαιδευτής HUR",
                "image": "HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
                "fee": "€400",
                "max_participants": 15,
                "type": "training"
            }
        ]
        
        for sem_data in seminars_data:
            existing_sem = db.query(Seminar).filter(Seminar.title == sem_data["title"]).first()
            if not existing_sem:
                seminar = Seminar(**sem_data)
                db.add(seminar)
        
        db.commit()
        
        # Create events
        events_data = [
            {
                "title": "HUR - Spinal Cord and Neurological Rehabilitation",
                "title_el": "HUR - Αποκατάσταση Νωτιαίου Μυελού και Νευρολογική Αποκατάσταση",
                "content": "Comprehensive rehabilitation program for spinal cord and neurological conditions",
                "content_el": "Ολοκληρωμένο πρόγραμμα αποκατάστασης για παθήσεις νωτιαίου μυελού και νευρολογικές παθήσεις",
                "date": datetime.now() - timedelta(days=7),
                "image": "HUR - Spinal Cord and Neurological Rehabilitation_1752000796341.jpg",
                "excerpt": "Latest advances in spinal cord rehabilitation",
                "excerpt_el": "Τελευταίες εξελίξεις στην αποκατάσταση νωτιαίου μυελού"
            },
            {
                "title": "Equipment Innovation Showcase",
                "title_el": "Παρουσίαση Καινοτομίας Εξοπλισμού",
                "content": "Showcase of latest rehabilitation equipment innovations",
                "content_el": "Παρουσίαση των τελευταίων καινοτομιών σε εξοπλισμό αποκατάστασης",
                "date": datetime.now() - timedelta(days=14),
                "image": "1601930431PRODUCTS_COVER_1752027894926.jpg",
                "excerpt": "Innovative solutions for better patient outcomes",
                "excerpt_el": "Καινοτόμες λύσεις για καλύτερα αποτελέσματα ασθενών"
            }
        ]
        
        for event_data in events_data:
            existing_event = db.query(Event).filter(Event.title == event_data["title"]).first()
            if not existing_event:
                event = Event(**event_data)
                db.add(event)
        
        db.commit()
        
        # Create banners
        banners_data = [
            {
                "title": "Rehabilitation Equipment & Solutions",
                "title_el": "Εξοπλισμός & Λύσεις Αποκατάστασης",
                "subtitle": "Professional healthcare technology for better outcomes",
                "subtitle_el": "Επαγγελματική τεχνολογία υγειονομικής περίθαλψης για καλύτερα αποτελέσματα",
                "image": "1599038152about_us_home_1751993313592.jpg",
                "link": "/products",
                "order": 1
            },
            {
                "title": "Advanced Training Programs",
                "title_el": "Προηγμένα Προγράμματα Εκπαίδευσης",
                "subtitle": "Professional development for healthcare practitioners",
                "subtitle_el": "Επαγγελματική ανάπτυξη για επαγγελματίες υγείας",
                "image": "seminar_1752044011822.jpeg",
                "link": "/education",
                "order": 2
            }
        ]
        
        for banner_data in banners_data:
            existing_banner = db.query(Banner).filter(Banner.title == banner_data["title"]).first()
            if not existing_banner:
                banner = Banner(**banner_data)
                db.add(banner)
        
        db.commit()
        
        # Create achievements
        achievements_data = [
            {
                "title": "Excellence in Service",
                "title_el": "Αριστεία στην Εξυπηρέτηση",
                "description": "Award for outstanding customer service in rehabilitation equipment",
                "description_el": "Βραβείο για εξαιρετική εξυπηρέτηση πελατών σε εξοπλισμό αποκατάστασης",
                "image": "Achievement_1752003982449.jpg"
            },
            {
                "title": "Innovation Leadership",
                "title_el": "Ηγεσία Καινοτομίας",
                "description": "Recognition for innovative solutions in healthcare technology",
                "description_el": "Αναγνώριση για καινοτόμες λύσεις στην τεχνολογία υγειονομικής περίθαλψης",
                "image": "send-award-virtual-celebration-employee-milestones_1752004100582.jpg"
            }
        ]
        
        for achievement_data in achievements_data:
            existing_achievement = db.query(Achievement).filter(Achievement.title == achievement_data["title"]).first()
            if not existing_achievement:
                achievement = Achievement(**achievement_data)
                db.add(achievement)
        
        db.commit()
        
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()